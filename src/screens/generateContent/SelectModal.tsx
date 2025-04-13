import React from 'react'
import {
  Modal,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
} from 'react-native'

import { Icons, TextComponent } from '@components'
import { Fonts, Radius, Spacing } from '@constants'
import { useTheme } from '@hooks'
import { Option } from './type'

interface SelectModalProps {
  visible: boolean
  title?: string
  options: Option[]
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
  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <View style={styles.modal}>
          <TextComponent text={title} style={styles.title} />
          <TouchableOpacity style={{ position: 'absolute', top: Spacing.l, right: Spacing.l }} onPress={onClose}>
            <Icons.CloseCircle size={24} color={colors.text} />
          </TouchableOpacity>

          <FlatList
            data={options}
            keyExtractor={(item) => item.value}
            renderItem={({ item }) => {
              const isSelected = item.value === selectedValue
              return (
                <TouchableOpacity
                  style={[styles.item, {backgroundColor: isSelected ? colors.primary : colors.surface}]}
                  onPress={() => {
                    onSelect(item.label)
                    onClose()
                  }}
                >
                  <TextComponent text={item.label} style={Fonts.body3} color={isSelected ? 'white' : colors.text}/>
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
    backgroundColor: '#fff',
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