<template>
  <el-input v-model="selectValue" :type="type" :placeholder="placeholder || (itemLabel && '请输入' + itemLabel)" v-bind="props.props" >
    <template v-if="companyText" #append>{{companyText}}</template>
  </el-input>
</template>

<script setup>
import {ref, watch} from 'vue'
  const emit = defineEmits(['update:modelValue'])
  const selectValue = ref('')
  const props = defineProps({
    modelValue: String,
    itemLabel: String,
    placeholder: String,
    type: String,
    props: Object,
    companyText: String
  })
  selectValue.value = props.modelValue
  emit('update:modelValue', props.modelValue)
  watch(() => props.modelValue, (value) => {
    selectValue.value = value
  })
  watch(selectValue, (value) => {
    emit('update:modelValue', value)
  })
</script>
