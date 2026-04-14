import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  TouchableOpacity, 
  StyleSheet, 
  Platform,
  Dimensions,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';
import type { RootStackParamList } from '../navigation/AppNavigator';

type ContactScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

// Contact data structure
interface Contact {
  id: string;
  name: string;
  role: string;
  phone: string;
  email: string;
  office?: string;
  department: string;
}

/**
 * ContactScreen Component
 * Displays a list of important campus contacts using FlatList
 * Implements parameter passing by navigating to ContactDetail screen
 * Uses responsive design with Dimensions API and Flexbox
 */
const ContactScreen: React.FC = () => {
  const navigation = useNavigation<ContactScreenNavigationProp>();
  const { colors, fontSize, shadows, spacing } = useTheme();
  const { width } = Dimensions.get('window');
  
  // Sample contact data - Important campus contacts
  const contacts: Contact[] = [
    {
      id: '1',
      name: 'Dr. Tashi Dorji',
      role: 'Dean of Students',
      phone: '+975 5-252-251',
      email: 'tashi.dorji@cst.edu.bt',
      office: 'Administration Building, Room 201',
      department: 'Student Affairs',
    },
    {
      id: '2',
      name: 'Ms. Pema Lhamo',
      role: 'IT Helpdesk Coordinator',
      phone: '+975 5-252-252',
      email: 'pema.lhamo@cst.edu.bt',
      office: 'IT Building, Ground Floor',
      department: 'IT Services',
    },
    {
      id: '3',
      name: 'Mr. Karma Wangchuk',
      role: 'Student Services Officer',
      phone: '+975 5-252-253',
      email: 'karma.wangchuk@cst.edu.bt',
      office: 'Student Center, Room 105',
      department: 'Student Services',
    },
    {
      id: '4',
      name: 'Dr. Sonam Choden',
      role: 'Academic Coordinator',
      phone: '+975 5-252-254',
      email: 'sonam.choden@cst.edu.bt',
      office: 'Academic Block, Room 302',
      department: 'Academics',
    },
    {
      id: '5',
      name: 'Mr. Ugyen Tenzin',
      role: 'Library Head',
      phone: '+975 5-252-255',
      email: 'ugyen.tenzin@cst.edu.bt',
      office: 'Library Building, 2nd Floor',
      department: 'Library Services',
    },
    {
      id: '6',
      name: 'Ms. Deki Yangzom',
      role: 'Health Center Nurse',
      phone: '+975 5-252-256',
      email: 'deki.yangzom@cst.edu.bt',
      office: 'Health Center',
      department: 'Health Services',
    },
    {
      id: '7',
      name: 'Mr. Tshering Dorji',
      role: 'Security Supervisor',
      phone: '+975 5-252-257',
      email: 'tshering.dorji@cst.edu.bt',
      office: 'Security Office, Main Gate',
      department: 'Security',
    },
    {
      id: '8',
      name: 'Ms. Sangay Choki',
      role: 'Hostel Warden',
      phone: '+975 5-252-258',
      email: 'sangay.choki@cst.edu.bt',
      office: 'Hostel Block A',
      department: 'Student Housing',
    },
  ];

  /**
   * Handle contact item press
   * Demonstrates parameter passing between screens
   */
  const handleContactPress = (contact: Contact) => {
    navigation.navigate('ContactDetail', {
      name: contact.name,
      role: contact.role,
      phone: contact.phone,
      email: contact.email,
      office: contact.office,
    });
  };

  /**
   * Render individual contact item
   * Uses dynamic styling based on theme
   */
  const renderContactItem = ({ item }: { item: Contact }) => (
    <TouchableOpacity
      style={[
        styles.contactCard,
        {
          backgroundColor: colors.card,
          borderColor: colors.border,
          ...shadows.small,
          // Responsive width based on screen size
          width: width > 600 ? '48%' : '100%',
        },
      ]}
      onPress={() => handleContactPress(item)}
      activeOpacity={0.7}
    >
      {/* Contact Icon */}
      <View style={[styles.iconContainer, { backgroundColor: colors.primaryLight }]}>
        <AntDesign name="user" size={24} color="#FFFFFF" />
      </View>
      
      {/* Contact Information */}
      <View style={styles.contactInfo}>
        <Text 
          style={[
            styles.contactName, 
            { color: colors.textPrimary, fontSize: fontSize.lg }
          ]}
          numberOfLines={1}
        >
          {item.name}
        </Text>
        <Text 
          style={[
            styles.contactRole, 
            { color: colors.accent, fontSize: fontSize.sm }
          ]}
          numberOfLines={1}
        >
          {item.role}
        </Text>
        <Text 
          style={[
            styles.contactDepartment, 
            { color: colors.textSecondary, fontSize: fontSize.xs }
          ]}
          numberOfLines={1}
        >
          {item.department}
        </Text>
        <Text 
          style={[
            styles.contactPhone, 
            { color: colors.textSecondary, fontSize: fontSize.sm }
          ]}
          numberOfLines={1}
        >
          <AntDesign name="phone" size={fontSize.sm} color={colors.textSecondary} /> {item.phone}
        </Text>
      </View>
      
      {/* Arrow indicator */}
      <View style={styles.arrowContainer}>
        <AntDesign name="right" size={20} color={colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );

  /**
   * Render header component for the list
   */
  const renderHeader = () => (
    <View style={[styles.header, { backgroundColor: colors.backgroundSecondary }]}>
      <Text style={[styles.headerText, { color: colors.textPrimary, fontSize: fontSize.md }]}>
        Important Campus Contacts
      </Text>
      <Text style={[styles.subHeaderText, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
        Tap to view full details
      </Text>
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={contacts}
        renderItem={renderContactItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={[
          styles.listContainer,
          { paddingBottom: spacing.xl }
        ]}
        // Enable pull-to-refresh (optional enhancement)
        showsVerticalScrollIndicator={true}
        // Platform-specific optimization
        removeClippedSubviews={Platform.OS === 'android'}
        initialNumToRender={10}
        maxToRenderPerBatch={10}
        windowSize={10}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    padding: 16,
  },
  header: {
    padding: 16,
    marginBottom: 16,
    borderRadius: 12,
  },
  headerText: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  subHeaderText: {
    fontStyle: 'italic',
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  contactInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  contactName: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  contactRole: {
    fontWeight: '600',
    marginBottom: 2,
  },
  contactDepartment: {
    fontStyle: 'italic',
    marginBottom: 4,
  },
  contactPhone: {
    fontWeight: '400',
  },
  arrowContainer: {
    marginLeft: 8,
  },
});

export default ContactScreen;
