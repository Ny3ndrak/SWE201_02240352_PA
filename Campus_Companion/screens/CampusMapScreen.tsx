import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  Linking,
  Dimensions,
  Platform,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';

// Map link data structure
interface MapLink {
  id: string;
  title: string;
  description: string;
  url: string;
  icon: keyof typeof AntDesign.glyphMap;
}

/**
 * CampusMapScreen Component
 * Displays campus map links and location information
 * Uses ScrollView for content and provides external links
 */
const CampusMapScreen: React.FC = () => {
  const { colors, fontSize, shadows, spacing } = useTheme();
  const { width } = Dimensions.get('window');
  
  const isLargeScreen = width > 600;

  // Sample map links and locations
  const mapLinks: MapLink[] = [
    {
      id: '1',
      title: 'Google Maps - CST Campus',
      description: 'View CST Rinchending campus location on Google Maps',
      url: 'https://maps.google.com/?q=College+of+Science+and+Technology+Phuentsholing+Bhutan',
      icon: 'enviromento',
    },
    {
      id: '2',
      title: 'Campus Virtual Tour',
      description: 'Take a virtual 360° tour of the campus facilities',
      url: 'https://cst.edu.bt',
      icon: 'appstore-o',
    },
    {
      id: '3',
      title: 'Hostel Locations',
      description: 'View maps and directions to student hostels',
      url: 'https://cst.edu.bt',
      icon: 'home',
    },
    {
      id: '4',
      title: 'Library Floor Plan',
      description: 'Interactive floor plan of the campus library',
      url: 'https://cst.edu.bt',
      icon: 'book',
    },
  ];

  /**
   * Handle external link press
   */
  const handleLinkPress = async (url: string) => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      console.error(`Cannot open URL: ${url}`);
    }
  };

  /**
   * Render map link card
   */
  const renderMapLink = (link: MapLink) => (
    <TouchableOpacity
      key={link.id}
      style={[
        styles.linkCard,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          ...shadows.medium,
        },
      ]}
      onPress={() => handleLinkPress(link.url)}
      activeOpacity={0.7}
    >
      <View style={[styles.linkIconContainer, { backgroundColor: colors.primaryLight }]}>
        <AntDesign name={link.icon} size={24} color="#FFFFFF" />
      </View>
      <View style={styles.linkContent}>
        <Text 
          style={[
            styles.linkTitle, 
            { color: colors.primary, fontSize: fontSize.md }
          ]}
        >
          {link.title}
        </Text>
        <Text 
          style={[
            styles.linkDescription, 
            { color: colors.textSecondary, fontSize: fontSize.sm }
          ]}
          numberOfLines={2}
        >
          {link.description}
        </Text>
      </View>
      <AntDesign name="right" size={20} color={colors.accent} />
    </TouchableOpacity>
  );



  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={[styles.content, { paddingBottom: spacing.xl }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: colors.card, ...shadows.small }]}>
        <Text style={[styles.headerTitle, { color: colors.textPrimary, fontSize: fontSize.xl }]}>
          Campus Maps & Locations
        </Text>
        <Text style={[styles.headerSubtitle, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
          Navigate your way around campus
        </Text>
      </View>

      {/* Map Links Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.textPrimary, fontSize: fontSize.lg }]}>
          Interactive Maps
        </Text>
        {mapLinks.map(renderMapLink)}
      </View>

      {/* Campus Address */}
      <View 
        style={[
          styles.addressCard, 
          { 
            backgroundColor: colors.card,
            borderColor: colors.primary,
            ...shadows.medium,
          }
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
          <AntDesign name="home" size={fontSize.md} color={colors.primary} />
          <Text style={[styles.addressTitle, { color: colors.primary, fontSize: fontSize.md, marginLeft: 8 }]}>
            Campus Address
          </Text>
        </View>
        <Text style={[styles.addressText, { color: colors.textPrimary, fontSize: fontSize.sm }]}>
          College of Science and Technology
        </Text>
        <Text style={[styles.addressText, { color: colors.textPrimary, fontSize: fontSize.sm }]}>
          Royal University of Bhutan
        </Text>
        <Text style={[styles.addressText, { color: colors.textPrimary, fontSize: fontSize.sm }]}>
          Rinchending, Phuentsholing
        </Text>
        <Text style={[styles.addressText, { color: colors.textPrimary, fontSize: fontSize.sm }]}>
          Bhutan
        </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 8 }}>
          <AntDesign name="phone" size={fontSize.sm} color={colors.textSecondary} />
          <Text style={[styles.addressContact, { color: colors.textSecondary, fontSize: fontSize.sm, marginLeft: 6 }]}>
            +975 5-252-251
          </Text>
        </View>
      </View>

      {/* Info Box */}
      <View 
        style={[
          styles.infoBox, 
          { 
            backgroundColor: colors.backgroundSecondary,
            borderLeftColor: colors.info,
          }
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <AntDesign name="infocirlceo" size={fontSize.sm} color={colors.textSecondary} style={{ marginTop: 2 }} />
          <Text style={[styles.infoText, { color: colors.textSecondary, fontSize: fontSize.xs, marginLeft: 8, flex: 1 }]}>
            Tip: Tap on any map link to open it in your default browser or maps application
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  header: {
    padding: 20,
    borderRadius: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  headerSubtitle: {
    textAlign: 'center',
    fontStyle: 'italic',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: 12,
  },
  linkCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
  },
  linkIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  linkContent: {
    flex: 1,
  },
  linkTitle: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  linkDescription: {
    lineHeight: 18,
  },

  addressCard: {
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    marginBottom: 16,
  },
  addressTitle: {
    fontWeight: 'bold',
  },
  addressText: {
    marginBottom: 4,
    textAlign: 'center',
  },
  addressContact: {
    marginTop: 8,
    fontWeight: '600',
  },
  infoBox: {
    padding: 12,
    borderRadius: 8,
    borderLeftWidth: 4,
  },
  infoText: {
    lineHeight: 18,
    fontStyle: 'italic',
  },
});

export default CampusMapScreen;
