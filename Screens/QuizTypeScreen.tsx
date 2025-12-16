import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTypedNavigation } from '../Hooks/useTypedNavigation';
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
import apiService from '../Services/apiService';

const QuizTypeScreen = () => {
  const navigation = useTypedNavigation();

  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true); // initially true

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await apiService.get('/quizzes');
        setQuizzes(res.data.quizzes);
        console.log("Fetched quizzes:", res.data.quizzes);
      } catch (err) {
        console.log("Error fetching quizzes:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header title="Quizzes" leftIcon={<ArrowLeft />} onPressLeft={() => navigation.goBack()} />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.mainHeading}>Choose a quiz</Text>

        <View style={styles.listContainer}>
          {loading ? (
            <Text>Loading Quizzes...</Text>
          ) : (
            quizzes.map((quiz) => (
              <View key={quiz.id} style={styles.card}>

                {/* Left Side: Content */}
                <View style={styles.contentContainer}>
                  <Text style={styles.quizTitle}>{quiz.title}</Text>
                  <Text style={styles.quizDescription}>{quiz.description}</Text>

                  <TouchableOpacity
                    style={styles.startButton}
                    onPress={() => {
                      if (quiz.id) {
                        navigation.navigate('Quiz', { title: quiz.title, quizId: quiz.id });
                      } else {
                        Alert.alert("Quiz Error", "Quiz ID not found.");
                      }
                    }}
                  >
                    <Text style={styles.startButtonText}>Start</Text>
                  </TouchableOpacity>

                </View>

                {/* Right Side: Image */}
                <View style={styles.imageWrapper}>
                  {quiz.image_url && (
                    <Image
                      source={{ uri: quiz.image_url }}
                      style={styles.quizImage}
                      resizeMode="contain"
                    />
                  )}
                </View>

              </View>
            ))
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default QuizTypeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  mainHeading: {
    fontSize: FONTSIZES.h3,
    fontWeight: FONTWEIGHTS.bold,
    color: COLORS.text,
    marginTop: SPACING.md,
    marginBottom: SPACING.lg,
  },
  listContainer: {
    gap: SPACING.xxl,
  },
  card: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    backgroundColor: 'transparent',
  },
  contentContainer: {
    flex: 1,
    paddingRight: SPACING.md,
  },
  quizTitle: {
    fontSize: FONTSIZES.bodyLarge,
    fontWeight: FONTWEIGHTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
    lineHeight: 24,
  },
  quizDescription: {
    fontSize: FONTSIZES.bodySmall,
    color: '#526D82',
    marginBottom: SPACING.md,
    lineHeight: 20,
  },
  startButton: {
    backgroundColor: COLORS.secondary,
    paddingVertical: 8,
    paddingHorizontal: 24,
    borderRadius: RADIUS.sm,
    alignSelf: 'flex-start',
  },
  startButtonText: {
    fontSize: FONTSIZES.bodySmall,
    fontWeight: FONTWEIGHTS.semibold,
    color: COLORS.text,
  },
  imageWrapper: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.md,
    overflow: 'hidden',
    backgroundColor: '#FDF2E3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quizImage: {
    width: '100%',
    height: '100%',
  },
});
