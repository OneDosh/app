import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

export default function WelcomeScreen() {
  const handleContinue = () => {
    router.push('/onboarding');
  };

  const handleSignIn = () => {
    router.push('/onboarding');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#f8f9fa', '#e9ecef']}
        style={styles.gradient}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Hero Image */}
        <View style={styles.heroContainer}>
          <Image
            source={require('../assets/images/U-Mockups.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomSection}>
          <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
            <Text style={styles.continueButtonText}>Continue with Phone or Email</Text>
          </TouchableOpacity>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By using OneDosh, you agree to accept our{' '}
              <Text style={styles.linkText}>Terms of Use</Text> and{' '}
              <Text style={styles.linkText}>Privacy Policy</Text>
            </Text>
          </View>

          <View style={styles.signInContainer}>
            <Text style={styles.signInText}>Already have an account? </Text>
            <TouchableOpacity onPress={handleSignIn}>
              <Text style={styles.signInLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: 40,
    paddingBottom: 20,
  },
  logo: {
    width: 200,
    height: 60,
  },
  heroContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heroImage: {
    width: width,
    height: height * 0.5,
    maxHeight: 500,
    marginBottom: 70,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 20,
  },
  continueButton: {
    // Exact specifications from design
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    width: 354,
    height: 50,
    backgroundColor: 'rgba(2, 21, 43, 0.04)',
    borderWidth: 1,
    borderColor: 'rgba(2, 21, 43, 0.08)',
    borderRadius: 40,
    alignSelf: 'center',
    marginBottom: 24,
    // Complex shadow effects
    shadowColor: 'rgba(2, 21, 43, 0.08)',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 1,
    shadowRadius: 2,
    elevation: 2,
  },
  continueButtonText: {
    width: 240,
    height: 26,
    fontFamily: 'Inter-Regular', // Using Inter as SF Pro Text alternative
    fontWeight: '400',
    fontSize: 18,
    lineHeight: 26,
    letterSpacing: -0.018 * 18, // -0.018em converted to pixels
    color: '#02152B',
    textAlign: 'center',
    // Text shadow effect
    textShadowColor: 'rgba(255, 255, 255, 0.25)',
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 0.5,
  },
  termsContainer: {
    // Exact specifications from design
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 0,
    width: 256,
    height: 32,
    alignSelf: 'center',
    marginBottom: 24,
  },
  termsText: {
    // Exact specifications from design
    width: 256,
    height: 32,
    fontFamily: 'Inter-Regular', // Using Inter as SF Pro Text alternative
    fontWeight: '400',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    letterSpacing: -0.012 * 12, // -0.012em converted to pixels
    color: 'rgba(2, 21, 43, 0.48)',
    // Note: mix-blend-mode: plus-darker is not supported in React Native
    // The visual effect is approximated through the color opacity
  },
  linkText: {
    color: '#007AFF',
    textDecorationLine: 'underline',
  },
  signInContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signInText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  signInLink: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
  },
});