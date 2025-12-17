import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTypedNavigation } from '../Hooks/useTypedNavigation';
import apiService from '../Services/apiService';

import { ArrowLeft, Search, BookOpen, Users, Heart, HelpCircle } from 'lucide-react-native';
import { COLORS, FONTSIZES, FONTWEIGHTS, SPACING, RADIUS } from '../Constants/Constants';
import Header from '../Components/Header';

const CATEGORIES = [
  { id: 1, title: 'Articles', type: 'article', icon: <BookOpen size={24} color={COLORS.text} /> },
  { id: 2, title: 'Support Groups', type: 'support_group', icon: <Users size={24} color={COLORS.text} /> },
  { id: 3, title: 'Therapy', type: 'therapy', icon: <Heart size={24} color={COLORS.text} /> },
  { id: 4, title: 'FAQs', type: 'faq', icon: <HelpCircle size={24} color={COLORS.text} /> },
];

const ResourcesScreen = () => {
  const navigation = useTypedNavigation();

  const [resources, setResources] = useState([]);             // all resources
  const [filteredResources, setFilteredResources] = useState([]); // displayed resources
  const [loading, setLoading] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Fetch resources
  const fetchResources = async () => {
    try {
      setLoading(true);
      const res = await apiService.get('/resources');
      const allResources = res.data.resources || [];
      setResources(allResources);

      // initially show featured resources
      const featuredResources = allResources.filter(r => r.is_featured === 1 || r.is_featured === true);
      setFilteredResources(featuredResources);
    } catch (error) {
      console.log('Error fetching resources:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResources();
  }, []);

  // Handle search input
  const handleSearch = (text: string) => {
    setSearchText(text);
    const filtered = resources.filter(r =>
      (!selectedCategory || r.type === selectedCategory) &&
      r.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredResources(filtered);
  };

  // Handle category click
  const handleCategoryPress = (category) => {
    if (selectedCategory === category.type) {
      // If same category clicked, reset to featured
      setSelectedCategory(null);
      setFilteredResources(resources.filter(r => r.is_featured === 1 || r.is_featured === true));
    } else {
      setSelectedCategory(category.type);
      const filtered = resources.filter(r =>
        r.type === category.type &&
        r.title.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredResources(filtered);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        title="Resources"
        leftIcon={<ArrowLeft color={COLORS.text} />}
        onPressLeft={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Search */}
        <View style={styles.searchContainer}>
          <Search color={COLORS.mutedText} size={20} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search resources"
            placeholderTextColor={COLORS.mutedText}
            value={searchText}
            onChangeText={handleSearch}
          />
        </View>

        {/* Categories */}
        <Text style={styles.sectionTitle}>Categories</Text>
        <View style={styles.categoriesGrid}>
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat.id}
              style={styles.categoryCard}
              activeOpacity={0.7}
              onPress={() => handleCategoryPress(cat)}
            >
              <View style={styles.catIconWrapper}>{cat.icon}</View>
              <Text style={styles.catTitle}>{cat.title}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Resources */}
        <Text style={styles.sectionTitle}>Featured</Text>
        {loading ? (
          <ActivityIndicator size="large" style={{ marginVertical: 50 }} />
        ) : filteredResources.length === 0 ? (
          <Text style={{ textAlign: 'center', marginVertical: 50 }}>No resources found</Text>
        ) : (
          <View style={styles.featuredList}>
            {filteredResources.map((item) => (
              <TouchableOpacity key={item.id} style={styles.featuredCard} activeOpacity={0.8}>
                <View style={styles.featuredContent}>
                  <Text style={styles.tagText}>{item.type}</Text>
                  <Text style={styles.featuredTitle}>{item.title}</Text>
                  <Text style={styles.featuredDesc} numberOfLines={3}>{item.description}</Text>
                </View>
                <View style={[styles.imagePlaceholder, { backgroundColor: item.imageColor || '#F5E6D3' }]}>
                  {item.image ? <Image source={{ uri: item.image }} style={styles.featuredImage} /> : <View style={styles.abstractShape} />}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
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