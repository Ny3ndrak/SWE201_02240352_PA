import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Dimensions,
  Platform,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { useTheme } from '../components/ThemeContext';
import { AntDesign } from '@expo/vector-icons';

type ContactDetailScreenRouteProp = RouteProp<RootStackParamList, 'ContactDetail'>;
type ContactDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ContactDetail'
>;

type Props = {
  route: ContactDetailScreenRouteProp;
  navigation: ContactDetailScreenNavigationProp;
};

const { width } = Dimensions.get('window');

/**
 * ContactDetailScreen displays detailed information about a selected contact
 * Including name, role, contact info, office location, and office hours
 */
const ContactDetailScreen: React.FC<Props> = ({ route, navigation }) => {
  const { name, role, phone, email, office } = route.params;
  const { theme } = useTheme();

  const handleCall = () => {
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = () => {
    Linking.openURL(`mailto:${email}`);
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {/* Contact Avatar */}
      <View style={[styles.avatarContainer, { backgroundColor: theme.primary + '20' }]}>
        <AntDesign name="user" size={80} color={theme.primary} />
      </View>

      {/* Contact Name & Role */}
      <Text style={[styles.name, { color: theme.text }]}>{name}</Text>
      <Text style={[styles.role, { color: theme.primary }]}>{role}</Text>

      {/* Contact Information Card */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Contact Information</Text>

        {/* Phone */}
        <View style={styles.infoRow}>
          <AntDesign name="phone" size={20} color={theme.primary} />
          <Text style={[styles.infoText, { color: theme.text }]}>{phone}</Text>
        </View>

        {/* Email */}
        <View style={styles.infoRow}>
          <AntDesign name="mail" size={20} color={theme.primary} />
          <Text style={[styles.infoText, { color: theme.text }]}>{email}</Text>
        </View>

        {/* Office Location */}
        {office && (
          <View style={styles.infoRow}>
            <AntDesign name="enviromento" size={20} color={theme.primary} />
            <Text style={[styles.infoText, { color: theme.text }]}>{office}</Text>
          </View>
        )}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, { backgroundColor: theme.primary }]}
          onPress={handleCall}
          activeOpacity={0.8}
        >
          <AntDesign name="phone" size={20} color="#fff" />
          <Text style={styles.buttonText}>Call</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.emailButton, { borderColor: theme.primary }]}
          onPress={handleEmail}
          activeOpacity={0.8}
        >
          <AntDesign name="mail" size={20} color={theme.primary} />
          <Text style={[styles.buttonText, { color: theme.primary }]}>Email</Text>
        </TouchableOpacity>
      </View>

      {/* Office Hours Card */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>Office Hours</Text>
        <View style={styles.infoRow}>
          <AntDesign name="clockcircleo" size={20} color={theme.primary} />
          <Text style={[styles.infoText, { color: theme.text }]}>
            Monday - Friday: 9:00 AM - 5:00 PM
          </Text>
        </View>
      </View>

      {/* Additional Info */}
      <View style={[styles.tipCard, { backgroundColor: theme.primary + '15' }]}>
        <AntDesign name="infocirlceo" size={20} color={theme.primary} />
        <Text style={[styles.tipText, { color: theme.text }]}>
          Please call ahead to schedule an appointment for better service.
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 16,
  },
  avatarContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  role: {
    fontSize: 16,
    marginBottom: 24,
    textAlign: 'center',
    fontWeight: '600',
  },
  card: {
    width: width - 32,
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 15,
    marginLeft: 12,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    width: width - 32,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 14,
    borderRadius: 8,
    marginHorizontal: 6,
  },
  emailButton: {
    backgroundColor: 'transparent',
    borderWidth: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  tipCard: {
    width: width - 32,
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    marginLeft: 12,
    lineHeight: 20,
  },
});

export default ContactDetailScreen;
