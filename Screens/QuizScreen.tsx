import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import { useTypedNavigation } from '../Hooks/useTypedNavigation';
import apiService from '../Services/apiService';

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
import { ArrowLeft } from 'lucide-react-native';

const QuizScreen = () => {
  const navigation = useTypedNavigation();
  const route = useRoute();

  // Get title from previous screen
  // @ts-ignore
  const quizTitle = route.params?.title || "Autism Spectrum Quotient (AQ) Test";

  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});

  // Helper to transform API data
  const extractQuestions = (quizData: any) => {
    if (!quizData || !quizData.Questions) return [];
    return quizData.Questions.map((q: any) => ({
      id: q.id,
      text: q.questionText,
      options: q.QuestionOptions?.map((opt: any) => ({
        id: opt.id,
        label: opt.optionText,
        value: opt.optionValue,
      })) || [],
    }));
  };

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const quizId = route.params?.quizId || 1;
        const res = await apiService.get(`quizzes/${quizId}`);
        console.log("Fetched questions:", res.data);

        const questionsArray = extractQuestions(res.data.quiz);
        setQuestions(questionsArray);
      } catch (err) {
        console.log("Error loading questions:", err);
        Alert.alert("Failed to load questions", "Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  // Loading state
  if (loading) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ textAlign: 'center', marginTop: 50 }}>
          Loading questions...
        </Text>
      </SafeAreaView>
    );
  }

  // No questions fallback
  if (!questions.length) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <Text style={{ textAlign: 'center', marginTop: 50 }}>
          No questions available
        </Text>
      </SafeAreaView>
    );
  }

  const currentQuestion = questions[currentIndex] || { text: '', options: [] };
  const totalQuestions = questions.length;

  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  const handleSelectOption = (value: number) => {
    setAnswers(prev => ({
      ...prev,
      [currentIndex]: value
    }));
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
  };

  const handleNext = () => {
    if (answers[currentIndex] === undefined) {
      Alert.alert("Selection Required", "Please select an answer to proceed.");
      return;
    }

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      const totalScore = Object.values(answers).reduce((sum, val) => sum + val, 0);
      console.log("Quiz Finished! Score:", totalScore);
      // @ts-ignore
      navigation.navigate('QuizResult', { score: totalScore });
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title={quizTitle}
        leftIcon={<ArrowLeft color={COLORS.text} />}
        onPressLeft={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Progress */}
        <View style={styles.progressSection}>
          <Text style={styles.progressText}>
            Question {currentIndex + 1} of {totalQuestions}
          </Text>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
        </View>

        {/* Question */}
        <Text style={styles.questionText}>{currentQuestion.text}</Text>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {currentQuestion.options.map((option: any) => {
            const isSelected = answers[currentIndex] === option.value;
            return (
              <TouchableOpacity
                key={option.id}
                style={[styles.optionButton, isSelected && styles.optionButtonSelected]}
                onPress={() => handleSelectOption(option.value)}
                activeOpacity={0.7}
              >
                <Text style={[styles.optionText, isSelected && styles.optionTextSelected]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer Navigation */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.navButton,
            styles.prevButton,
            currentIndex === 0 && styles.disabledButton
          ]}
          onPress={handlePrevious}
          disabled={currentIndex === 0}
        >
          <Text style={styles.prevButtonText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.navButton, styles.nextButton]}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>
            {currentIndex === totalQuestions - 1 ? "Finish" : "Next"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default QuizScreen;

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: COLORS.background },
  scrollContent: { padding: SPACING.lg, paddingBottom: 100 },
  progressSection: { marginBottom: SPACING.xl },
  progressText: {
    fontSize: FONTSIZES.body,
    fontWeight: FONTWEIGHTS.medium,
    color: COLORS.text,
    marginBottom: SPACING.sm
  },
  progressBarTrack: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: RADIUS.round,
    width: '100%',
    overflow: 'hidden'
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: COLORS.primary,
    borderRadius: RADIUS.round
  },
  questionText: {
    fontSize: FONTSIZES.h4,
    fontWeight: FONTWEIGHTS.medium,
    color: COLORS.text,
    marginBottom: SPACING.xxl,
    lineHeight: 28
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.md
  },
  optionButton: {
    width: '48%',
    paddingVertical: SPACING.md,
    paddingHorizontal: SPACING.sm,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 60
  },
  optionButtonSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#F0F9FF'
  },
  optionText: {
    fontSize: FONTSIZES.bodySmall,
    fontWeight: FONTWEIGHTS.medium,
    color: COLORS.text,
    textAlign: 'center'
  },
  optionTextSelected: {
    color: COLORS.primary,
    fontWeight: FONTWEIGHTS.bold
  },
  footer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6'
  },
  navButton: {
    width: '40%',
    paddingVertical: 12,
    borderRadius: RADIUS.sm,
    alignItems: 'center',
    justifyContent: 'center'
  },
  prevButton: { backgroundColor: '#E5E7EB' },
  nextButton: { backgroundColor: COLORS.primary },
  disabledButton: { opacity: 0.5 },
  prevButtonText: {
    color: COLORS.text,
    fontWeight: FONTWEIGHTS.bold,
    fontSize: FONTSIZES.body
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontWeight: FONTWEIGHTS.bold,
    fontSize: FONTSIZES.body
  }
});
