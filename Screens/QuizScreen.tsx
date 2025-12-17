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
import type { RouteProp } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

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
type RootStackParamList = {
  QuizScreen: {
    quizId: number;
    title: string;
  };
  QuizResult: {
    assessmentId: number;
    score: number;
    quizTitle: string;
  };
};

const QuizScreen = () => {
const navigation = useTypedNavigation();
const route = useRoute<RouteProp<RootStackParamList, 'QuizScreen'>>();



  const quizTitle = route.params?.title ?? 'Autism Spectrum Quotient (AQ) Test';

  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});

  const extractQuestions = (data: any) => {
    const questions = data?.quiz?.Questions ?? [];
    return questions.map((q: any) => ({
      id: q.id,
      text: q.questionText,
      options: q.QuestionOptions.map((opt: any) => ({
        id: opt.id,
        label: opt.optionText,
        value: opt.optionValue,
      })),
    }));
  };

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const quizId = route.params?.quizId ?? 1;
        const res = await apiService.get(`/quizzes/${quizId}/questions`);
        const parsedQuestions = extractQuestions(res.data);
        setQuestions(parsedQuestions);
      } catch (error) {
        console.log('❌ QUIZ API ERROR', error);
        Alert.alert('Error', 'Failed to load quiz questions');
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, []);

  if (loading) return <Text style={{ textAlign: 'center', marginTop: 50 }}>Loading questions...</Text>;
  if (!questions.length) return <Text style={{ textAlign: 'center', marginTop: 50 }}>No questions available</Text>;

  const currentQuestion = questions[currentIndex];
  const totalQuestions = questions.length;
  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  const handleSelectOption = (value: number) => {
    setAnswers(prev => ({ ...prev, [currentIndex]: value }));
  };

  const handleNext = async () => {
    if (answers[currentIndex] === undefined) {
      Alert.alert('Required', 'Please select an option');
      return;
    }

    if (currentIndex < totalQuestions - 1) {
      setCurrentIndex(prev => prev + 1);
      return;
    }

    const totalScore = Object.values(answers).reduce((sum, v) => sum + v, 0);
    const quizId = route.params?.quizId ?? 1;

    try {
      const assessmentRes = await apiService.post('assessments', { quiz_id: quizId });
      const assessmentId = assessmentRes.data.assessment.id; // ✅ fixed

      const formattedAnswers = Object.keys(answers).map(index => {
        const question = questions[Number(index)];
        const selectedValue = answers[Number(index)];

        const option = question.options.find(o => String(o.value) === String(selectedValue));
        if (!option) throw new Error(`No option found for question ${question.id}`);

        return {
          question_id: question.id,
          answer_value: selectedValue,
          option_id: option.id,
        };
      });

     const res = await apiService.post(`assessments/${assessmentId}/answers`, { answers: formattedAnswers });
      console.log(res);
      navigation.navigate('QuizResult', {
        assessmentId,
        score: totalScore,
        quizTitle
      });

    } catch (error) {
      console.log('❌ ASSESSMENT API ERROR', error);
      Alert.alert('Error', 'Failed to submit quiz assessment');
    }
  };



  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
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
          {currentQuestion.options.map(option => {
            const selected = answers[currentIndex] === option.value;
            return (
              <TouchableOpacity
                key={option.id}
                style={[styles.optionButton, selected && styles.optionButtonSelected]}
                onPress={() => handleSelectOption(option.value)}
              >
                <Text style={[styles.optionText, selected && styles.optionTextSelected]}>
                  {option.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity
          disabled={currentIndex === 0}
          onPress={handlePrevious}
          style={[styles.navButton, styles.prevButton, currentIndex === 0 && styles.disabledButton]}
        >
          <Text style={styles.prevButtonText}>Previous</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext} style={[styles.navButton, styles.nextButton]}>
          <Text style={styles.nextButtonText}>{currentIndex === totalQuestions - 1 ? 'Finish' : 'Next'}</Text>
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
