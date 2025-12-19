import React, { useEffect, useState, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Switch,
  Alert,
  ActivityIndicator,
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
} from '../Constants/Constants';

// Components
import Header from '../Components/Header';
import apiService from '../Services/apiService';

const SettingsScreen = () => {
  const navigation = useTypedNavigation();

  // State
  const [loading, setLoading] = useState(false);
  const [settings, setSettings] = useState({
    notificationsEnabled: false,
    profileVisibility: 'Public',
    dataUsage: false,
  });

  // 1. Fetch initial settings when screen mounts
  useEffect(() => {
    const getInitialSettings = async () => {
      try {
        setLoading(true);
        const response = await apiService.get('user/settings'); 
        if (response.data) {
          setSettings(response.data);
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };
    getInitialSettings();
  }, []);

  // 2. Centralized Update Function
  // This sends the updated value to the API immediately after a toggle
  const updateSettingOnServer = async (key: string, value: any) => {
    try {
      // Optimistic Update: Update UI first
      const updatedSettings = { ...settings, [key]: value };
      setSettings(updatedSettings);

      // API Call
      await apiService.put('user/settings', updatedSettings);
      // Optional: Toast message instead of Alert for better UX
    } catch (error) {
      Alert.alert('Error', 'Failed to sync settings with server.');
      // Rollback state if API fails
      setSettings(settings); 
    }
  };

  const handleProfileVisibilityChange = () => {
    Alert.alert(
      "Profile Visibility",
      "Choose your profile visibility setting:",
      [
        { text: "Public", onPress: () => updateSettingOnServer('profileVisibility', 'Public') },
        { text: "Friends Only", onPress: () => updateSettingOnServer('profileVisibility', 'Friends Only') },
        { text: "Private", onPress: () => updateSettingOnServer('profileVisibility', 'Private') },
        { text: "Cancel", style: "cancel" }
      ]
    );
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

  if (loading) {
    return (
      <View style={[styles.safeArea, { justifyContent: 'center' }]}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

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
              Receive notifications about new quizzes and updates.
            </Text>
          </View>
          <Switch
            trackColor={{ false: '#E5E7EB', true: COLORS.primary }}
            thumbColor={'#FFFFFF'}
            ios_backgroundColor="#E5E7EB"
            onValueChange={(val) => updateSettingOnServer('notificationsEnabled', val)}
            value={settings.notificationsEnabled}
          />
        </View>

        {/* --- Section: Privacy --- */}
        <Text style={styles.sectionHeader}>Privacy</Text>
        
        <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={handleProfileVisibilityChange}>
          <View style={styles.textContainer}>
            <Text style={styles.rowTitle}>Profile Visibility</Text>
            <Text style={styles.rowDescription}>
              Currently: <Text style={{fontWeight: 'bold'}}>{settings.profileVisibility}</Text>
            </Text>
          </View>
          <ChevronRight color={COLORS.text} size={24} />
        </TouchableOpacity>

        <View style={styles.row}>
          <View style={styles.textContainer}>
            <Text style={styles.rowTitle}>Data Usage</Text>
            <Text style={styles.rowDescription}>
              Manage the data collected about your usage.
            </Text>
          </View>
          <Switch
            trackColor={{ false: '#E5E7EB', true: COLORS.primary }}
            thumbColor={'#FFFFFF'}
            onValueChange={(val) => updateSettingOnServer('dataUsage', val)}
            value={settings.dataUsage}
          />
        </View>

        {/* --- Section: Account --- */}
        <Text style={styles.sectionHeader}>Account</Text>
        <TouchableOpacity style={styles.row} activeOpacity={0.7} onPress={handleLogout}>
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

// ... (Styles remain the same)

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