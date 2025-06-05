import React, { useEffect, useState } from 'react'
import {
  Modal,
  View,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Pressable,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native'
import { useTranslation } from 'react-i18next'

import { Icons, TextComponent } from '@components'
import { Fonts, Radius, Spacing } from '@constants'
import { useTheme } from '@hooks'
import CustomInputModal from './CustomInputModal'

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
  const [searchText, setSearchText] = useState('')
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options)
  const [customInputVisible, setCustomInputVisible] = useState(false)

  useEffect(() => {
    if (!searchText) {
      setFilteredOptions(options)
    } else {
      setFilteredOptions(
        options.filter(option =>
          t(option).toLowerCase().includes(searchText.toLowerCase())
        )
      )
    }
  }, [searchText, options])

  return (
    <Modal visible={visible} transparent animationType="fade">
      <Pressable style={styles.overlay} onPress={onClose}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.keyboardAvoiding}
        >
          <View style={[styles.modal, { backgroundColor: colors.containerBackground }]}>
            <TextComponent text={t(`${title}`)} style={styles.title} />
            <TouchableOpacity
              style={{ position: 'absolute', top: Spacing.l, right: Spacing.l }}
              onPress={() => {
                onClose()
                setSearchText('')
              }}>
              <Icons.CloseCircle size={24} color={colors.text} />
            </TouchableOpacity>

            {options.length > 11 && (
              <TextInput
                value={searchText}
                onChangeText={setSearchText}
                placeholder={t('search')}
                placeholderTextColor={colors.placehodler}
                style={[
                  {
                    backgroundColor: colors.background,
                    color: colors.text,
                    borderRadius: Radius.m,
                    paddingHorizontal: Spacing.m,
                    paddingVertical: Spacing.l,
                    marginBottom: Spacing.m,
                    ...Fonts.body3,
                  }
                ]}
              />
            )}

            <FlatList
              data={filteredOptions}
              keyExtractor={(item) => item}
              renderItem={({ item }) => {
                const isSelected = item === selectedValue
                return (
                  <TouchableOpacity
                    style={[styles.item, { backgroundColor: isSelected ? colors.primary : colors.background }]}
                    onPress={() => {
                      if (item === 'custom') {
                        setCustomInputVisible(true)
                      } else {
                        onSelect(item)
                        setSearchText('')
                        onClose()
                      }
                    }}
                  >
                    <TextComponent text={t(`${item}`)} style={Fonts.body3} color={isSelected ? 'white' : colors.text} />
                  </TouchableOpacity>
                )
              }}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
            />
          </View>
        </KeyboardAvoidingView>
      </Pressable>

      <CustomInputModal
        visible={customInputVisible}
        onClose={() => setCustomInputVisible(false)}
        onSubmit={(value) => {
          onSelect(value)
          setCustomInputVisible(false)
          onClose()
        }}
      />
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
  keyboardAvoiding: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
})