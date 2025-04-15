import React from 'react'
import {
  Modal,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native'
import { useTranslation } from 'react-i18next'

import { Icons, TextComponent } from '@components'
import { Fonts, Radius, Spacing } from '@constants'
import { useTheme } from '@hooks'

interface SelectModalProps {
  visible: boolean
  title?: string
  options: string[]
  selectedValue: string | null
  onSelect: (value: string) => void
  onClose: () => void
}

const SelectModal: React.FC<SelectModalProps> = ({
  visible,
  title = 'Select',
  options,
  selectedValue,
  onSelect,
  onClose,
}) => {
  const { colors } = useTheme()
  const { t } = useTranslation()

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={[styles.modal, { backgroundColor: colors.containerBackground }]}>
          <TextComponent text={t(`${title}`)} style={styles.title} />
          <TouchableOpacity style={{ position: 'absolute', top: Spacing.l, right: Spacing.l }} onPress={onClose}>
            <Icons.CloseCircle size={24} color={colors.text} />
          </TouchableOpacity>

          <FlatList
            data={options}
            keyExtractor={(item) => item}
            renderItem={({ item }) => {
              const isSelected = item === selectedValue
              return (
                <TouchableOpacity
                  style={[styles.item, { backgroundColor: isSelected ? colors.primary : colors.background }]}
                  onPress={() => {
                    onSelect(item)
                    onClose()
                  }}
                >
                  <TextComponent text={t(`${item}`)} style={Fonts.body3} color={isSelected ? 'white' : colors.text} />
                </TouchableOpacity>
              )
            }}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
          />
        </View>
      </Pressable>
    </Modal>
  )
}

export default SelectModal

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#00000099',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '90%',
    borderRadius: Radius.l,
    padding: Spacing.l,
    maxHeight: '90%',
  },
  title: {
    marginBottom: Spacing.l,
    ...Fonts.h3
  },
  item: {
    paddingVertical: Spacing.s,
    paddingHorizontal: Spacing.m,
    borderRadius: Radius.m,
  },
  separator: {
    height: Spacing.s,
  },
})