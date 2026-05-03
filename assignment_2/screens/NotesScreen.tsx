import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  ScrollView,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useTheme } from '../components/ThemeContext';

interface Note {
  id: string;
  title: string;
  content: string;
  category: string;
  color: string;
  date: string;
}

/**
 * NotesScreen Component
 * Quick note-taking interface for study notes and reminders
 * Implements: Modal animations, List rendering, Category organization
 */
const NotesScreen: React.FC = () => {
  const { colors, fontSize } = useTheme();
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  // Mock notes data
  const notes: Note[] = [
    {
      id: '1',
      title: 'SWE201 - React Native Components',
      content: 'Key components:\n- View, Text, ScrollView\n- FlatList for rendering lists\n- TouchableOpacity for buttons\n- Animated API for animations',
      category: 'Study Notes',
      color: '#4A90E2',
      date: 'Today, 10:30 AM',
    },
    {
      id: '2',
      title: 'DIS303 - RSA Algorithm',
      content: 'RSA Encryption Steps:\n1. Choose two prime numbers p, q\n2. Calculate n = p × q\n3. Calculate φ(n) = (p-1)(q-1)\n4. Choose e (public key)\n5. Calculate d (private key)',
      category: 'Important',
      color: '#FF6B6B',
      date: 'Yesterday',
    },
    {
      id: '3',
      title: 'CTE205 - Process Scheduling',
      content: 'Scheduling Algorithms:\n- FCFS (First Come First Serve)\n- SJF (Shortest Job First)\n- Round Robin\n- Priority Scheduling\n\nContext switching overhead important!',
      category: 'Study Notes',
      color: '#7B68EE',
      date: '2 days ago',
    },
    {
      id: '4',
      title: 'SDA202 - Cloud Patterns',
      content: 'Common architecture patterns:\n- Microservices\n- Load Balancing\n- Caching strategies\n- Database replication\n- Auto-scaling',
      category: 'Study Notes',
      color: '#FFD93D',
      date: 'May 1',
    },
    {
      id: '5',
      title: 'DIS303 - Cryptographic Hash',
      content: 'Hash Function Properties:\n- One-way function\n- Collision resistant\n- Fixed output size\n\nCommon: SHA-256, MD5 (deprecated)',
      category: 'Study Notes',
      color: '#4ECDC4',
      date: 'April 30',
    },
    {
      id: '6',
      title: 'Exam Schedule',
      content: 'SWE201 - May 10 (Assignment 2 due)\nDIS303 - May 15 (Cryptology exam)\nSDA202 - May 20 (Architecture project)\nCTE205 - May 25 (OS practical)',
      category: 'Important',
      color: '#FF6B6B',
      date: 'April 28',
    },
    {
      id: '7',
      title: 'CTE205 - Memory Management',
      content: 'Memory allocation techniques:\n- Paging\n- Segmentation\n- Virtual memory\n- Page replacement algorithms (LRU, FIFO)\n\nAvoid fragmentation!',
      category: 'Study Notes',
      color: '#9B59B6',
      date: 'April 25',
    },
    {
      id: '8',
      title: 'SWE201 - Animation Tips',
      content: '✓ Use useNativeDriver for performance\n✓ Interpolate for smooth transitions\n✓ PanResponder for gestures\n✓ Keep animations under 300ms\n✓ Test on actual devices',
      category: 'Tips',
      color: '#4ECDC4',
      date: 'April 20',
    },
  ];

  const handleNotePress = (note: Note) => {
    setSelectedNote(note);
    setModalVisible(true);
  };

  const renderNoteCard = ({ item }: { item: Note }) => (
    <TouchableOpacity
      style={[
        styles.noteCard,
        { backgroundColor: colors.card, borderLeftColor: item.color, borderColor: colors.border },
      ]}
      onPress={() => handleNotePress(item)}
      activeOpacity={0.7}
    >
      <View style={styles.noteHeader}>
        <Text style={[styles.noteTitle, { color: colors.textPrimary, fontSize: fontSize.md }]}>
          {item.title}
        </Text>
        <View style={[styles.categoryBadge, { backgroundColor: item.color + '30' }]}>
          <Text style={[styles.categoryText, { color: item.color, fontSize: fontSize.xs }]}>
            {item.category}
          </Text>
        </View>
      </View>
      <Text
        style={[styles.notePreview, { color: colors.textSecondary, fontSize: fontSize.sm }]}
        numberOfLines={3}
      >
        {item.content}
      </Text>
      <View style={styles.noteFooter}>
        <Text style={[styles.noteDate, { color: colors.textSecondary, fontSize: fontSize.xs }]}>
          {item.date}
        </Text>
        <AntDesign name="right" size={14} color={colors.textSecondary} />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {/* Header with stats */}
      <View style={[styles.headerCard, { backgroundColor: colors.card }]}>
        <View style={styles.statContainer}>
          <AntDesign name="file-text" size={24} color={colors.accent} />
          <Text style={[styles.statNumber, { color: colors.textPrimary, fontSize: fontSize.xl }]}>
            {notes.length}
          </Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
            Total Notes
          </Text>
        </View>
      </View>

      {/* Notes List */}
      <FlatList
        data={notes}
        renderItem={renderNoteCard}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      {/* Add Note Button */}
      <TouchableOpacity
        style={[styles.addButton, { backgroundColor: colors.accent }]}
        activeOpacity={0.8}
      >
        <AntDesign name="plus" size={24} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Note Detail Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: colors.card }]}>
            {selectedNote && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <View style={styles.modalHeader}>
                  <View style={[styles.colorBar, { backgroundColor: selectedNote.color }]} />
                  <TouchableOpacity
                    style={styles.closeButton}
                    onPress={() => setModalVisible(false)}
                  >
                    <AntDesign name="close" size={24} color={colors.textPrimary} />
                  </TouchableOpacity>
                </View>

                <Text style={[styles.modalTitle, { color: colors.textPrimary, fontSize: fontSize.xxl }]}>
                  {selectedNote.title}
                </Text>

                <View style={styles.modalMeta}>
                  <View style={[styles.categoryBadge, { backgroundColor: selectedNote.color + '30' }]}>
                    <Text style={[styles.categoryText, { color: selectedNote.color, fontSize: fontSize.xs }]}>
                      {selectedNote.category}
                    </Text>
                  </View>
                  <Text style={[styles.modalDate, { color: colors.textSecondary, fontSize: fontSize.sm }]}>
                    {selectedNote.date}
                  </Text>
                </View>

                <View style={[styles.divider, { backgroundColor: colors.border }]} />

                <Text style={[styles.modalContent, { color: colors.textPrimary, fontSize: fontSize.md }]}>
                  {selectedNote.content}
                </Text>

                <View style={styles.modalActions}>
                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: colors.accent }]}
                    activeOpacity={0.8}
                  >
                    <AntDesign name="edit" size={18} color="#FFFFFF" />
                    <Text style={[styles.actionButtonText, { fontSize: fontSize.sm }]}>
                      Edit
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[styles.actionButton, { backgroundColor: '#FF6B6B' }]}
                    activeOpacity={0.8}
                  >
                    <AntDesign name="delete" size={18} color="#FFFFFF" />
                    <Text style={[styles.actionButtonText, { fontSize: fontSize.sm }]}>
                      Delete
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerCard: {
    padding: 20,
    margin: 15,
    marginBottom: 10,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  statContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statNumber: {
    fontWeight: 'bold',
    marginLeft: 15,
    marginRight: 10,
  },
  statLabel: {
  },
  listContent: {
    paddingHorizontal: 15,
    paddingBottom: 80,
  },
  noteCard: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  noteHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  noteTitle: {
    fontWeight: '600',
    flex: 1,
    marginRight: 10,
  },
  categoryBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
  },
  categoryText: {
    fontWeight: '500',
    textTransform: 'uppercase',
  },
  notePreview: {
    lineHeight: 20,
    marginBottom: 8,
  },
  noteFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  noteDate: {
    fontStyle: 'italic',
  },
  addButton: {
    position: 'absolute',
    right: 20,
    bottom: 20,
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  colorBar: {
    width: 4,
    height: 40,
    borderRadius: 2,
  },
  closeButton: {
    padding: 5,
  },
  modalTitle: {
    fontWeight: 'bold',
    marginBottom: 15,
    lineHeight: 32,
  },
  modalMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  modalDate: {
    fontStyle: 'italic',
  },
  divider: {
    height: 1,
    marginVertical: 15,
  },
  modalContentText: {
    lineHeight: 24,
    marginBottom: 20,
  },
  modalActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
    marginLeft: 6,
  },
});

export default NotesScreen;
