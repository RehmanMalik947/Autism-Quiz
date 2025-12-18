import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
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
import Button from '../Components/Button';
import Spacer from '../Components/Spacer';
import apiService from '../Services/apiService';

const EditProfileScreen = () => {
  const navigation = useTypedNavigation();



  // State for form fields
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoaiding] = useState(false);
  const handleSaveChanges = async () => {

    try {
      setLoaiding(true);
      const res = await apiService.put('user/profile', { name, age:age ? Number(age): null });
      Alert.alert('Success', 'Profile Updated Successfully');
      navigation.goBack();
      setLoaiding(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    finally {
      setLoaiding(false);
    }

  }

  return (
    <SafeAreaView style={styles.safeArea}>

      {/* Custom Header with Close Icon */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.closeButton}
        >
          {/* Simple X text icon, or replace with your Icon component (e.g., <Ionicons name="close" />) */}
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Edit Profile</Text>

        {/* Invisible view to balance the title in the center */}
        <View style={styles.closeButton} />
      </View>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Spacer />

        {/* Name Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
            placeholderTextColor={COLORS.mutedText}
          />
        </View>

        {/* Age Input */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Age (Optional)</Text>
          <TextInput
            style={styles.input}
            placeholder="Enter your age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
            placeholderTextColor={COLORS.mutedText}
          />
        </View>

        {/* Avatar Section */}
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Avatar</Text>
          <View style={styles.imageContainer}>
            {/* 
              ⚠️ NOTE: Ensure the path matches your project structure.
              If 'public' is at the root, you might need '../' or '../../' 
            */}
            <Image
              source={require('../public/images/avatar.png')}
              style={styles.avatarImage}
              resizeMode="cover"
            />
          </View>
        </View>

      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <Button
          ButtonText={loading ? 'Saving.. ' : 'Save Changes'}
          TextColor="white"
          ButtonBg={COLORS.primary}
          style={{ width: '100%' }}
          disabled={loading}
          OnPress={handleSaveChanges}
        />
      </View>

    </SafeAreaView>
  );
};

export default EditProfileScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.md,
    backgroundColor: COLORS.background,
  },
  closeButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  closeIcon: {
    fontSize: 24,
    color: COLORS.text,
    fontWeight: '300',
  },
  headerTitle: {
    fontSize: FONTSIZES.h4,
    fontWeight: FONTWEIGHTS.bold,
    color: COLORS.text,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },
  inputGroup: {
    marginBottom: SPACING.lg,
  },
  label: {
    fontSize: FONTSIZES.body,
    fontWeight: FONTWEIGHTS.semibold,
    color: COLORS.text,
    marginBottom: SPACING.sm,
  },
  input: {
    backgroundColor: COLORS.secondary, // Light gray background like image
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    fontSize: FONTSIZES.body,
    color: COLORS.text,
  },
  imageContainer: {
    borderRadius: RADIUS.lg,
    overflow: 'hidden',
    marginTop: SPACING.xs,
  },
  avatarImage: {
    width: '100%',
    height: 300, // Height to match the aspect ratio in your screenshot
    backgroundColor: COLORS.secondary,
  },
  footer: {
    padding: SPACING.lg,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
});