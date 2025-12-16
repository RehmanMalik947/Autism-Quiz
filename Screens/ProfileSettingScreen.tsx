import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTypedNavigation } from '../Hooks/useTypedNavigation';

// Icons
import { ArrowLeft, ArrowRight, ChevronRight } from 'lucide-react-native';

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

const SettingsScreen = () => {
  const navigation = useTypedNavigation();

  // State for the Toggle Switch
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const toggleSwitch = () => {
    setNotificationsEnabled(previousState => !previousState);
  };

  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Log Out", 
          style: "destructive", 
          onPress: () => navigation.navigate('Login' as any) 
        }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header 
        title="Settings" 
        leftIcon={<ArrowLeft color={COLORS.text} />} 
        onPressLeft={() => navigation.goBack()} 
      />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* --- Section: Notifications --- */}
        <Text style={styles.sectionHeader}>Notifications</Text>
        
        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.rowTitle}>App Notifications</Text>
            <Text style={styles.rowDescription}>
              Receive notifications about new quizzes, updates, and community events.
            </Text>
          </View>
          <Switch
            trackColor={{ false: '#E5E7EB', true: COLORS.primary }}
            thumbColor={'#FFFFFF'}
            ios_backgroundColor="#E5E7EB"
            onValueChange={toggleSwitch}
            value={notificationsEnabled}
          />
        </View>

        {/* --- Section: Privacy --- */}
        <Text style={styles.sectionHeader}>Privacy</Text>

        {/* Profile Visibility */}
        <TouchableOpacity style={styles.row} activeOpacity={0.7}>
          <View style={styles.textContainer}>
            <Text style={styles.rowTitle}>Profile Visibility</Text>
            <Text style={styles.rowDescription}>
              Control who can see your profile and activity.
            </Text>
          </View>
          <ChevronRight color={COLORS.text} size={24} />
        </TouchableOpacity>

        {/* Data Usage */}
        <TouchableOpacity style={styles.row} activeOpacity={0.7}>
          <View style={styles.textContainer}>
            <Text style={styles.rowTitle}>Data Usage</Text>
            <Text style={styles.rowDescription}>
              Manage the data collected about your usage of the app.
            </Text>
          </View>
          <ChevronRight color={COLORS.text} size={24} />
        </TouchableOpacity>

        {/* --- Section: Account --- */}
        <Text style={styles.sectionHeader}>Account</Text>

        {/* Log Out */}
        <TouchableOpacity 
          style={styles.row} 
          activeOpacity={0.7}
          onPress={handleLogout}
        >
          <View style={styles.textContainer}>
            <Text style={styles.rowTitle}>Log Out</Text>
          </View>
          <ArrowRight color={COLORS.text} size={24} />
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background, // White
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  
  // Section Headers
  sectionHeader: {
    fontSize: FONTSIZES.h4, // 18-20px
    fontWeight: FONTWEIGHTS.bold,
    color: COLORS.text,
    marginTop: SPACING.xl,
    marginBottom: SPACING.lg,
  },

  // Row Styles
  row: {
    flexDirection: 'row',
    alignItems: 'center', // Centers vertically
    justifyContent: 'space-between',
    marginBottom: SPACING.xl, // Space between rows
  },
  textContainer: {
    flex: 1, // Takes up remaining space
    paddingRight: SPACING.md, // Space before arrow/switch
  },
  rowTitle: {
    fontSize: FONTSIZES.body, // 16px
    fontWeight: FONTWEIGHTS.medium, // Semi-bold looks better for titles
    color: COLORS.text,
    marginBottom: 4, // Tiny space between title and desc
  },
  rowDescription: {
    fontSize: FONTSIZES.bodySmall, // 14px
    color: '#526D82', // Blue-gray color for description text (matches screenshot)
    lineHeight: 20,
  },
});