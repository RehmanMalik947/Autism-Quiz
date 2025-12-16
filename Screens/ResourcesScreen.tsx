import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTypedNavigation } from '../Hooks/useTypedNavigation';

// Icons
import { 
  ArrowLeft, 
  Search, 
  BookOpen, 
  Users, 
  Heart, 
  HelpCircle 
} from 'lucide-react-native';

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

const CATEGORIES = [
  { id: 1, title: 'Articles', icon: <BookOpen size={24} color={COLORS.text} /> },
  { id: 2, title: 'Support Groups', icon: <Users size={24} color={COLORS.text} /> },
  { id: 3, title: 'Therapy', icon: <Heart size={24} color={COLORS.text} /> },
  { id: 4, title: 'FAQs', icon: <HelpCircle size={24} color={COLORS.text} /> },
];

const FEATURED_DATA = [
  {
    id: 1,
    tag: 'Article',
    title: 'Understanding Autism Spectrum Disorder',
    description: 'A comprehensive guide to understanding the nuances of autism, its symptoms, and how it affects individuals.',
    imageColor: '#F5E6D3', // Beige/Peach color from screenshot
    // image: require('../public/images/art1.png'), // Uncomment if you have real images
  },
  {
    id: 2,
    tag: 'Support Group',
    title: 'Autism Support Network',
    description: 'Connect with other families and individuals affected by autism. Share experiences and find support.',
    imageColor: '#F0E4D7', // Light pinkish beige
    // image: require('../public/images/art2.png'),
  },
];

const ResourcesScreen = () => {
  const navigation = useTypedNavigation();
  const [searchText, setSearchText] = useState('');

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <Header 
        title="Resources" 
        leftIcon={<ArrowLeft color={COLORS.text} />} 
        onPressLeft={() => navigation.goBack()} 
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search color={COLORS.mutedText} size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search resources"
            placeholderTextColor={COLORS.mutedText}
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>

        {/* Categories Grid */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesGrid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity 
              key={cat.id} 
              style={styles.categoryCard}
              activeOpacity={0.7}
            >
              <View style={styles.catIconWrapper}>
                {cat.icon}
              </View>
              <Text style={styles.catTitle}>{cat.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Featured Section */}
        <Text style={styles.sectionTitle}>Featured</Text>
        <View style={styles.featuredList}>
          {FEATURED_DATA.map((item) => (
            <TouchableOpacity key={item.id} style={styles.featuredCard} activeOpacity={0.8}>
              
              {/* Left Side: Text */}
              <View style={styles.featuredContent}>
                <Text style={styles.tagText}>{item.tag}</Text>
                <Text style={styles.featuredTitle}>{item.title}</Text>
                <Text style={styles.featuredDesc} numberOfLines={3}>
                  {item.description}
                </Text>
              </View>

              {/* Right Side: Image Placeholder */}
              <View style={[styles.imagePlaceholder, { backgroundColor: item.imageColor }]}>
                {/* 
                   If you have real images, use:
                   <Image source={item.image} style={styles.featuredImage} />
                */}
                {/* Abstract shape for demo purposes */}
                <View style={styles.abstractShape} />
              </View>
            </TouchableOpacity>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

export default ResourcesScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    paddingHorizontal: SPACING.lg,
    paddingBottom: SPACING.xxl,
  },

  // Search Bar
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EEF2F6', // Light gray background
    borderRadius: RADIUS.md,
    paddingHorizontal: SPACING.md,
    height: 50,
    marginBottom: SPACING.xl,
    marginTop: SPACING.sm,
  },
  searchIcon: {
    marginRight: SPACING.sm,
  },
  searchInput: {
    flex: 1,
    fontSize: FONTSIZES.body,
    color: COLORS.text,
  },

  // Section Headers
  sectionTitle: {
    fontSize: FONTSIZES.h3,
    fontWeight: FONTWEIGHTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.md,
  },

  // Categories Grid
  categoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: SPACING.md,
    marginBottom: SPACING.xxl,
  },
  categoryCard: {
    width: '48%', // Approx half width
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.background,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    padding: SPACING.md,
    height: 60,
  },
  catIconWrapper: {
    marginRight: SPACING.sm,
  },
  catTitle: {
    fontSize: FONTSIZES.bodySmall, // or 14-16
    fontWeight: FONTWEIGHTS.bold,
    color: COLORS.text,
  },

  // Featured Cards
  featuredList: {
    gap: SPACING.lg,
  },
  featuredCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: SPACING.md,
  },
  featuredContent: {
    flex: 1,
    paddingRight: SPACING.md,
  },
  tagText: {
    fontSize: FONTSIZES.caption,
    color: '#526D82', // Blue-gray
    marginBottom: SPACING.xs,
    fontWeight: FONTWEIGHTS.medium,
  },
  featuredTitle: {
    fontSize: FONTSIZES.bodyLarge,
    fontWeight: FONTWEIGHTS.bold,
    color: COLORS.text,
    marginBottom: SPACING.xs,
    lineHeight: 24,
  },
  featuredDesc: {
    fontSize: FONTSIZES.bodySmall,
    color: COLORS.mutedText,
    lineHeight: 20,
  },
  imagePlaceholder: {
    width: 100,
    height: 100,
    borderRadius: RADIUS.md,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  // Just a visual flair to match the "blob" look in screenshot if no image exists
  abstractShape: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: RADIUS.round,
    transform: [{ scaleX: 1.5 }, { rotate: '45deg' }],
  },
});