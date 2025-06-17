import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  Dimensions,
  Animated
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ArrowLeft } from 'lucide-react-native';
import { router } from 'expo-router';
import { useState, useRef, useEffect } from 'react';

const { width, height } = Dimensions.get('window');

// Responsive breakpoints
const isTablet = width >= 768;
const isLargeScreen = width >= 1024;

export default function OnboardingScreen() {
  const [input, setInput] = useState('');
  const [inputType, setInputType] = useState<'email' | 'phone' | null>(null);
  const [isFocused, setIsFocused] = useState(false);
  const [showExpandedInput, setShowExpandedInput] = useState(false);
  const inputRef = useRef<TextInput>(null);
  const animatedHeight = useRef(new Animated.Value(72)).current;
  const animatedBorderRadius = useRef(new Animated.Value(24)).current;

  const handleBack = () => {
    router.back();
  };

  const handleContinue = () => {
    if (input.trim()) {
      // Navigate to next step or tabs
      router.push('/(tabs)');
    }
  };

  const detectInputType = (text: string) => {
    // Enhanced detection logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    
    if (emailRegex.test(text)) {
      setInputType('email');
    } else if (phoneRegex.test(text.replace(/[\s\-\(\)]/g, ''))) {
      setInputType('phone');
    } else if (text.includes('@')) {
      setInputType('email');
    } else if (/^[\+\d\s\-\(\)]+$/.test(text) && text.length > 0) {
      setInputType('phone');
    } else {
      setInputType(null);
    }
  };

  const handleInputChange = (text: string) => {
    setInput(text);
    detectInputType(text);
  };

  const isValidInput = () => {
    if (inputType === 'email') {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
    } else if (inputType === 'phone') {
      const cleanPhone = input.replace(/[\s\-\(\)]/g, '');
      return /^[\+]?[1-9][\d]{9,14}$/.test(cleanPhone);
    }
    return input.trim().length > 0;
  };

  const handleFocus = () => {
    setIsFocused(true);
    setShowExpandedInput(true);
    
    // Animate to expanded state
    Animated.parallel([
      Animated.timing(animatedHeight, {
        toValue: 92,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(animatedBorderRadius, {
        toValue: 16,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    
    // If input is empty, animate back to compact state
    if (input.trim().length === 0) {
      setShowExpandedInput(false);
      
      Animated.parallel([
        Animated.timing(animatedHeight, {
          toValue: 72,
          duration: 200,
          useNativeDriver: false,
        }),
        Animated.timing(animatedBorderRadius, {
          toValue: 24,
          duration: 200,
          useNativeDriver: false,
        }),
      ]).start();
    }
  };

  const handleCardPress = () => {
    inputRef.current?.focus();
  };

  // Auto-focus when component mounts
  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Responsive dimensions
  const getResponsiveDimensions = () => {
    const maxContentWidth = isLargeScreen ? 480 : isTablet ? 400 : width - 48;
    const inputWidth = Math.min(354, width - 48);
    const horizontalPadding = Math.max(24, (width - maxContentWidth) / 2);
    
    return {
      contentWidth: maxContentWidth,
      inputWidth,
      horizontalPadding,
    };
  };

  const { contentWidth, inputWidth, horizontalPadding } = getResponsiveDimensions();

  const getPlaceholderText = () => {
    if (inputType === 'email') return 'Enter your email address';
    if (inputType === 'phone') return 'Enter your phone number';
    return 'Phone or Email';
  };

  const getLabelText = () => {
    if (inputType === 'email') return 'Email Address';
    if (inputType === 'phone') return 'Phone Number';
    return 'Phone or Email';
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={[
            styles.scrollContent,
            { paddingHorizontal: horizontalPadding }
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* Header */}
          <View style={[styles.header, { maxWidth: contentWidth, alignSelf: 'center', width: '100%' }]}>
            <TouchableOpacity 
              style={styles.backButton} 
              onPress={handleBack}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <ArrowLeft size={24} color="#000" />
            </TouchableOpacity>
            <Text style={[styles.headerTitle, { textAlign: 'left', flex: 1, marginLeft: 16 }]}>
              {getLabelText()}
            </Text>
          </View>

          {/* Content */}
          <View style={[styles.content, { maxWidth: contentWidth, alignSelf: 'center', width: '100%' }]}>
            <Text style={[styles.subtitle, { textAlign: 'left' }]}>
              {inputType === 'email' 
                ? 'We\'ll send you a verification code to confirm your email address.'
                : inputType === 'phone'
                ? 'We\'ll send you a verification code via SMS to confirm your phone number.'
                : 'Please enter your phone number or email address to continue.'
              }
            </Text>

            {/* Animated Input Container */}
            <View style={[styles.inputContainer, { width: inputWidth }]}>
              <Animated.View 
                style={[
                  styles.animatedInputWrapper,
                  {
                    width: inputWidth,
                    height: animatedHeight,
                    borderRadius: animatedBorderRadius,
                  }
                ]}
              >
                <TouchableOpacity 
                  style={styles.inputTouchable}
                  onPress={handleCardPress}
                  activeOpacity={1}
                >
                  {(showExpandedInput || input.length > 0) && (
                    <Text style={styles.inputLabel}>
                      {getLabelText()}
                    </Text>
                  )}
                  
                  <TextInput
                    ref={inputRef}
                    style={[
                      showExpandedInput || input.length > 0 
                        ? styles.textInputExpanded 
                        : styles.textInputCompact
                    ]}
                    value={input}
                    onChangeText={handleInputChange}
                    placeholder={showExpandedInput || isFocused ? getPlaceholderText() : 'Phone or Email'}
                    placeholderTextColor={
                      showExpandedInput || isFocused 
                        ? '#C7C7CC' 
                        : 'rgba(2, 21, 43, 0.32)'
                    }
                    keyboardType={
                      inputType === 'email' ? 'email-address' : 
                      inputType === 'phone' ? 'phone-pad' : 'default'
                    }
                    autoCapitalize="none"
                    autoCorrect={false}
                    autoComplete={inputType === 'email' ? 'email' : 'tel'}
                    textContentType={inputType === 'email' ? 'emailAddress' : 'telephoneNumber'}
                    returnKeyType="done"
                    onSubmitEditing={handleContinue}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                    blurOnSubmit={true}
                    clearButtonMode="while-editing"
                    selectionColor="#007AFF"
                  />
                </TouchableOpacity>
              </Animated.View>
            </View>

            {/* Input Type Indicator */}
            {inputType && (
              <View style={styles.inputTypeIndicator}>
                <View style={[
                  styles.inputTypeChip,
                  inputType === 'email' ? styles.emailChip : styles.phoneChip
                ]}>
                  <Text style={[
                    styles.inputTypeText,
                    inputType === 'email' ? styles.emailText : styles.phoneText
                  ]}>
                    {inputType === 'email' ? '📧 Email' : '📱 Phone'}
                  </Text>
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        {/* Bottom Section */}
        <View style={[
          styles.bottomSection, 
          { 
            paddingHorizontal: horizontalPadding,
            maxWidth: contentWidth + (horizontalPadding * 2),
            alignSelf: 'center',
            width: '100%'
          }
        ]}>
          <TouchableOpacity 
            style={[
              styles.continueButton,
              { maxWidth: contentWidth, alignSelf: 'center', width: inputWidth },
              isValidInput() && styles.continueButtonActive
            ]}
            onPress={handleContinue}
            disabled={!isValidInput()}
          >
            <Text style={[
              styles.continueButtonText,
              isValidInput() && styles.continueButtonTextActive
            ]}>
              {isValidInput() ? 'Continue' : 'Continue'}
            </Text>
          </TouchableOpacity>

          {/* Helper Text */}
          {input.length > 0 && !isValidInput() && (
            <Text style={styles.helperText}>
              {inputType === 'email' 
                ? 'Please enter a valid email address'
                : inputType === 'phone'
                ? 'Please enter a valid phone number'
                : 'Please enter a valid phone number or email address'
              }
            </Text>
          )}
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    minHeight: height - 200,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 8,
    paddingBottom: 20,
    backgroundColor: '#F2F2F7',
  },
  backButton: {
    width: 44,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: isTablet ? 20 : 17,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
    fontWeight: '600',
  },
  content: {
    flex: 1,
    paddingTop: 8,
  },
  subtitle: {
    fontSize: isTablet ? 17 : 15,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    lineHeight: isTablet ? 24 : 20,
    marginBottom: isTablet ? 40 : 32,
  },
  inputContainer: {
    marginBottom: 16,
    alignSelf: 'flex-start',
    position: 'absolute',
    left: 0,
    top: 180 - 32 - 8,
  },
  animatedInputWrapper: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
    overflow: 'hidden',
  },
  inputTouchable: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
    justifyContent: 'center',
  },
  inputLabel: {
    fontSize: 13,
    fontFamily: 'Inter-Medium',
    color: '#8E8E93',
    fontWeight: '500',
    marginBottom: 8,
    position: 'absolute',
    top: 12,
    left: 20,
    right: 20,
  },
  textInputCompact: {
    fontSize: 20,
    fontFamily: 'Inter-Regular',
    color: '#02152B',
    paddingVertical: 0,
    minHeight: 24,
    width: '100%',
    letterSpacing: -0.01 * 20,
    textAlignVertical: 'center',
  },
  textInputExpanded: {
    fontSize: 20,
    fontFamily: 'Inter-Regular',
    color: '#02152B',
    paddingVertical: 0,
    minHeight: 24,
    width: '100%',
    letterSpacing: -0.01 * 20,
    marginTop: 20,
  },
  inputTypeIndicator: {
    position: 'absolute',
    top: 280,
    left: 0,
    right: 0,
    alignItems: 'flex-start',
  },
  inputTypeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  emailChip: {
    backgroundColor: '#E3F2FD',
  },
  phoneChip: {
    backgroundColor: '#F3E5F5',
  },
  inputTypeText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    fontWeight: '500',
  },
  emailText: {
    color: '#1976D2',
  },
  phoneText: {
    color: '#7B1FA2',
  },
  bottomSection: {
    paddingBottom: Platform.OS === 'ios' ? 34 : 20,
    paddingTop: 16,
    backgroundColor: '#F2F2F7',
  },
  continueButton: {
    backgroundColor: '#E5E5EA',
    borderRadius: isTablet ? 30 : 25,
    paddingVertical: isTablet ? 20 : 16,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: isTablet ? 60 : 50,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  continueButtonActive: {
    backgroundColor: '#F4FA7D',
    shadowColor: '#D4FF4D',
    shadowOpacity: 0.3,
  },
  continueButtonText: {
    fontSize: isTablet ? 19 : 17,
    fontFamily: 'Inter-SemiBold',
    color: '#8E8E93',
    fontWeight: '600',
    textAlign: 'center',
  },
  continueButtonTextActive: {
    color: '#000',
  },
  helperText: {
    fontSize: 13,
    fontFamily: 'Inter-Regular',
    color: '#FF3B30',
    textAlign: 'center',
    marginTop: 12,
    paddingHorizontal: 20,
  },
});