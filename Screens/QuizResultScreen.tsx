import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { useTypedNavigation } from '../Hooks/useTypedNavigation';

// Icons
import { ArrowLeft, User, Users, BookOpen, Home } from 'lucide-react-native';

// Constants
import {
  COLORS,
  FONTSIZES,
  FONTWEIGHTS,
  SPACING,
  RADIUS,
} from '../Constants/Constants';

// Components
import Header from '../Components/Header';

const SUBSCALE_SCORES = [
  { label: 'Social Skills', score: 90 },
  { label: 'Communication', score: 40 },
  { label: 'Imagination', score: 85 },
  { label: 'Attention to Detail', score: 88 },
  { label: 'Routine', score: 30 },
];

const QuizResultScreen = () => {
  const navigation = useTypedNavigation();
  const route = useRoute<any>();

  // Get score and title from params
  const totalScore = route.params?.score ?? 0;
  const quizTitle = route.params?.quizTitle ?? 'Quiz Result';

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title={quizTitle}
        leftIcon={<ArrowLeft color={COLORS.text} />}
        onPressLeft={() => navigation.navigate('App' as any)}
      />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Title Section */}
        <Text style={styles.pageTitle}>
          Your Score for {quizTitle}
        </Text>

        {/* Score Card */}
        <View style={styles.scoreCard}>
          <Text style={styles.scoreLabel}>Total Score</Text>
          <Text style={styles.scoreValue}>{totalScore}</Text>
        </View>

        <Text style={styles.description}>
          Your score suggests a higher likelihood of autistic traits.
          This is not a diagnosis, but a starting point for further exploration.
        </Text>

        {/* Detailed Insights Section */}
        <Text style={styles.sectionTitle}>Detailed Insights</Text>
        <Text style={styles.subTitle}>Subscale Scores</Text>

        <View style={styles.chartContainer}>
          {SUBSCALE_SCORES.map((item, index) => (
            <View key={index} style={styles.chartRow}>
              <Text style={styles.chartLabel}>{item.label}</Text>
              <View style={styles.chartBarBackground}>
                <View style={[styles.chartBarFill, { width: `${item.score}%` }]} />
              </View>
            </View>
          ))}
        </View>

        {/* Recommendations Section */}
        <Text style={styles.sectionTitle}>Recommendations</Text>

        <View style={styles.recommendationsList}>
          <TouchableOpacity style={styles.recCard} activeOpacity={0.8}>
            <View style={styles.iconBox}>
              <User color={COLORS.text} size={24} />
            </View>
            <View style={styles.recContent}>
              <Text style={styles.recTitle}>Consult a Specialist</Text>
              <Text style={styles.recDesc}>
                Schedule an appointment with a qualified professional for a comprehensive evaluation.
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.recCard} activeOpacity={0.8}>
            <View style={styles.iconBox}>
              <Users color={COLORS.text} size={24} />
            </View>
            <View style={styles.recContent}>
              <Text style={styles.recTitle}>Join a Support Group</Text>
              <Text style={styles.recDesc}>
                Explore resources and support groups for individuals with autism and their families.
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity style={styles.recCard} activeOpacity={0.8}>
            <View style={styles.iconBox}>
              <BookOpen color={COLORS.text} size={24} />
            </View>
            <View style={styles.recContent}>
              <Text style={styles.recTitle}>Further Education</Text>
              <Text style={styles.recDesc}>
                Learn more about autism spectrum disorder, its characteristics, and available treatments.
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* Go Home Button */}
        <TouchableOpacity
          style={styles.homeButton}
          onPress={() => navigation.navigate('App' as any)}
        >
          <Home color={COLORS.background} size={20} />
          <Text style={styles.homeButtonText}>Return to Home</Text>
        </TouchableOpacity>

        {/* Bottom Padding */}
        <View style={{ height: SPACING.xxl }} />
      </ScrollView>
    </SafeAreaView>
  );
};

// --- STYLESHEET DEFINITION MOVED HERE ---
const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.md,
  },

  // Header Area
  pageTitle: {
    fontSize: FONTSIZES.h3,
    fontWeight: FONTWEIGHTS.bold,
    color: COLORS.text,
    textAlign: 'center',
    marginBottom: SPACING.xl,
    marginTop: SPACING.sm,
    lineHeight: 30,
  },

  // Score Card
  scoreCard: {
    backgroundColor: '#E8F0F2', // Light gray/blue match
    padding: SPACING.xl,
    borderRadius: RADIUS.md,
    alignItems: 'flex-start',
    marginBottom: SPACING.lg,
  },
  scoreLabel: {
    fontSize: FONTSIZES.body,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    fontWeight: FONTWEIGHTS.medium,
  },
  scoreValue: {
    fontSize: 36,
    fontWeight: FONTWEIGHTS.bold,
    color: COLORS.text,
  },
  description: {
    fontSize: FONTSIZES.body,
    color: COLORS.text,
    lineHeight: 24,
    marginBottom: SPACING.xxl,
  },

  // Headings
  sectionTitle: {
    fontSize: FONTSIZES.h3,
    fontWeight: FONTWEIGHTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },
  subTitle: {
    fontSize: FONTSIZES.body,
    fontWeight: FONTWEIGHTS.medium,
    color: COLORS.text,
    marginBottom: SPACING.lg,
  },

  // Bar Chart
  chartContainer: {
    marginBottom: SPACING.xxl,
    gap: SPACING.lg,
  },
  chartRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  chartLabel: {
    width: '40%',
    fontSize: FONTSIZES.bodySmall,
    color: COLORS.primary, // Using primary blue for text based on screenshot hint
    fontWeight: FONTWEIGHTS.bold,
  },
  chartBarBackground: {
    width: '55%',
    height: 12,
    backgroundColor: '#E5E7EB', // Gray background for bar
    borderRadius: RADIUS.sm,
    overflow: 'hidden',
  },
  chartBarFill: {
    height: '100%',
    backgroundColor: '#D1D5DB', // Darker gray fill (or use COLORS.primary for color)
    borderRadius: RADIUS.sm,
  },

  // Recommendations
  recommendationsList: {
    gap: SPACING.lg,
    marginBottom: SPACING.xl,
  },
  recCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F9FAFB',
    padding: SPACING.md,
    borderRadius: RADIUS.md,
  },
  iconBox: {
    width: 48,
    height: 48,
    backgroundColor: '#E8F0F2',
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: SPACING.md,
  },
  recContent: {
    flex: 1,
  },
  recTitle: {
    fontSize: FONTSIZES.body,
    fontWeight: FONTWEIGHTS.bold,
    color: COLORS.text,
    marginBottom: 4,
  },
  recDesc: {
    fontSize: FONTSIZES.bodySmall,
    color: '#6B7280',
    lineHeight: 20,
  },

  // Home Button
  homeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingVertical: SPACING.md,
    borderRadius: RADIUS.md,
    gap: SPACING.sm,
  },
  homeButtonText: {
    color: COLORS.background,
    fontSize: FONTSIZES.body,
    fontWeight: FONTWEIGHTS.bold,
  },
});

export default QuizResultScreen;