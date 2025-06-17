import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Plus, Eye, EyeOff, MoveHorizontal as MoreHorizontal } from 'lucide-react-native';
import { useState } from 'react';

const { width } = Dimensions.get('window');

export default function CardsScreen() {
  const [balanceVisible, setBalanceVisible] = useState(true);

  const cards = [
    {
      id: 1,
      type: 'Primary',
      number: '**** **** **** 1234',
      holder: 'JOHN DOE',
      expiry: '12/26',
      balance: 12847.50,
      colors: ['#1a1a1a', '#2d2d2d'],
    },
    {
      id: 2,
      type: 'Savings',
      number: '**** **** **** 5678',
      holder: 'JOHN DOE',
      expiry: '08/27',
      balance: 5420.75,
      colors: ['#007AFF', '#0056CC'],
    },
    {
      id: 3,
      type: 'Business',
      number: '**** **** **** 9012',
      holder: 'JOHN DOE',
      expiry: '03/28',
      balance: 8932.20,
      colors: ['#34C759', '#28A745'],
    },
  ];

  const transactions = [
    {
      id: 1,
      title: 'Apple Store',
      subtitle: 'Online Purchase',
      amount: -299.99,
      date: 'Today, 2:30 PM',
      card: '**** 1234',
    },
    {
      id: 2,
      title: 'Starbucks',
      subtitle: 'Coffee Shop',
      amount: -12.45,
      date: 'Today, 9:15 AM',
      card: '**** 1234',
    },
    {
      id: 3,
      title: 'Direct Deposit',
      subtitle: 'Salary',
      amount: 3500.00,
      date: 'Yesterday, 12:00 PM',
      card: '**** 5678',
    },
    {
      id: 4,
      title: 'Amazon',
      subtitle: 'Online Shopping',
      amount: -87.32,
      date: 'Yesterday, 6:45 PM',
      card: '**** 1234',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>My Cards</Text>
          <TouchableOpacity style={styles.addButton}>
            <Plus size={24} color="#007AFF" />
          </TouchableOpacity>
        </View>

        {/* Cards Carousel */}
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.cardsContainer}
          snapToInterval={width * 0.85 + 16}
          decelerationRate="fast"
        >
          {cards.map((card, index) => (
            <View key={card.id} style={[styles.cardWrapper, index === 0 && styles.firstCard]}>
              <LinearGradient
                colors={card.colors}
                style={styles.card}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
              >
                <View style={styles.cardHeader}>
                  <Text style={styles.cardType}>{card.type}</Text>
                  <TouchableOpacity>
                    <MoreHorizontal size={20} color="#fff" />
                  </TouchableOpacity>
                </View>

                <View style={styles.cardBalance}>
                  <Text style={styles.balanceLabel}>Available Balance</Text>
                  <View style={styles.balanceRow}>
                    <Text style={styles.balanceAmount}>
                      {balanceVisible ? `$${card.balance.toLocaleString()}` : '••••••'}
                    </Text>
                    <TouchableOpacity onPress={() => setBalanceVisible(!balanceVisible)}>
                      {balanceVisible ? (
                        <Eye size={20} color="#fff" />
                      ) : (
                        <EyeOff size={20} color="#fff" />
                      )}
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={styles.cardFooter}>
                  <View>
                    <Text style={styles.cardNumber}>{card.number}</Text>
                    <Text style={styles.cardHolder}>{card.holder}</Text>
                  </View>
                  <View style={styles.cardExpiry}>
                    <Text style={styles.expiryLabel}>VALID THRU</Text>
                    <Text style={styles.expiryDate}>{card.expiry}</Text>
                  </View>
                </View>
              </LinearGradient>
            </View>
          ))}
        </ScrollView>

        {/* Quick Actions */}
        <View style={styles.quickActions}>
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionEmoji}>💳</Text>
            </View>
            <Text style={styles.actionText}>Freeze Card</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionEmoji}>🔒</Text>
            </View>
            <Text style={styles.actionText}>Lock Card</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionEmoji}>📊</Text>
            </View>
            <Text style={styles.actionText}>Statements</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.actionButton}>
            <View style={styles.actionIcon}>
              <Text style={styles.actionEmoji}>⚙️</Text>
            </View>
            <Text style={styles.actionText}>Settings</Text>
          </TouchableOpacity>
        </View>

        {/* Recent Transactions */}
        <View style={styles.transactionsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Transactions</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See all</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.transactionsList}>
            {transactions.map((transaction) => (
              <TouchableOpacity key={transaction.id} style={styles.transactionItem}>
                <View style={styles.transactionLeft}>
                  <View style={styles.transactionIcon}>
                    <Text style={styles.transactionEmoji}>
                      {transaction.amount > 0 ? '💰' : '💳'}
                    </Text>
                  </View>
                  <View style={styles.transactionDetails}>
                    <Text style={styles.transactionTitle}>{transaction.title}</Text>
                    <Text style={styles.transactionSubtitle}>
                      {transaction.subtitle} • {transaction.card}
                    </Text>
                  </View>
                </View>
                <View style={styles.transactionRight}>
                  <Text style={[
                    styles.transactionAmount,
                    transaction.amount > 0 ? styles.incomeAmount : styles.expenseAmount
                  ]}>
                    {transaction.amount > 0 ? '+' : ''}${Math.abs(transaction.amount).toFixed(2)}
                  </Text>
                  <Text style={styles.transactionDate}>{transaction.date}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#000',
  },
  addButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  cardsContainer: {
    paddingLeft: 24,
    paddingRight: 8,
    paddingBottom: 32,
  },
  cardWrapper: {
    marginRight: 16,
  },
  firstCard: {
    marginLeft: 0,
  },
  card: {
    width: width * 0.85,
    height: 200,
    borderRadius: 20,
    padding: 24,
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardType: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
    opacity: 0.8,
  },
  cardBalance: {
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#fff',
    opacity: 0.7,
    marginBottom: 8,
  },
  balanceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  balanceAmount: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#fff',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  cardNumber: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#fff',
    marginBottom: 4,
  },
  cardHolder: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#fff',
    opacity: 0.8,
  },
  cardExpiry: {
    alignItems: 'flex-end',
  },
  expiryLabel: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
    color: '#fff',
    opacity: 0.6,
    marginBottom: 2,
  },
  expiryDate: {
    fontSize: 14,
    fontFamily: 'Inter-SemiBold',
    color: '#fff',
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  actionButton: {
    alignItems: 'center',
    flex: 1,
  },
  actionIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  actionEmoji: {
    fontSize: 24,
  },
  actionText: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#000',
    textAlign: 'center',
  },
  transactionsSection: {
    paddingHorizontal: 24,
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-Bold',
    color: '#000',
  },
  seeAllText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#007AFF',
  },
  transactionsList: {
    backgroundColor: '#fff',
    borderRadius: 16,
    overflow: 'hidden',
  },
  transactionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  transactionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  transactionIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  transactionEmoji: {
    fontSize: 20,
  },
  transactionDetails: {
    flex: 1,
  },
  transactionTitle: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#000',
    marginBottom: 2,
  },
  transactionSubtitle: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  transactionRight: {
    alignItems: 'flex-end',
  },
  transactionAmount: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    marginBottom: 2,
  },
  incomeAmount: {
    color: '#34C759',
  },
  expenseAmount: {
    color: '#FF3B30',
  },
  transactionDate: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
});