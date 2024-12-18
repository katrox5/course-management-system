<script setup lang="ts"></script>
<template>
  <!-- 主内容区域 -->

  <a-layout>
    <a-layout-content style="margin: 0 16px">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item></a-breadcrumb-item>
      </a-breadcrumb>
      <div
        :style="{
          padding: '24px',
          background: '#fff',
          minHeight: '360px',
        }"
      >
        <!-- 第一排 -->
        <div class="card-row">
          <el-card class="box-card">
            <div class="radio-container">
              <el-radio v-model="checked1" label="1">可选择</el-radio>
            </div>
            <div
              class="group-info"
              style="
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                margin-top: 20px;
              "
            >
              <div class="position">第一位</div>
              <a-button
                type="primary"
                @click="toggleButtonState(1)"
                :style="{
                  marginLeft: '62px',
                  marginTop: '30px',
                  padding: '6px 6px',
                  color: buttonText1 === '取消选择' ? 'red' : 'white',
                  backgroundColor: buttonText1 === '取消选择' ? '#ffcccc' : '#2678ff',
                }"
              >
                {{ buttonText1 }}
              </a-button>
            </div>
          </el-card>

          <el-card class="box-card">
            <div class="radio-container">
              <el-radio v-model="checked1" label="1">可选择</el-radio>
            </div>
            <div
              class="group-info"
              style="
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                margin-top: 20px;
              "
            >
              <div class="position">第二位</div>
              <a-button
                type="primary"
                @click="toggleButtonState(2)"
                :style="{
                 marginLeft: '62px',
                  marginTop: '30px',
                  padding: '6px 6px',
                  color: buttonText2 === '取消选择' ? 'red' : 'white',
                  backgroundColor: buttonText2 === '取消选择' ? '#ffcccc' : '#2678ff',
                }"
              >
                {{ buttonText2 }}
              </a-button>
            </div>
          </el-card>

          <el-card class="box-card">
            <div class="radio-container">
              <el-radio v-model="checked1" label="1">可选择</el-radio>
            </div>
            <div
              class="group-info"
              style="
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                margin-top: 20px;
              "
            >
              <div class="position">第三位</div>
              <a-button
                type="primary"
                @click="toggleButtonState(3)"
                :style="{
                 marginLeft: '62px',
                  marginTop: '30px',
                  padding: '6px 6px',
                  color: buttonText3 === '取消选择' ? 'red' : 'white',
                  backgroundColor: buttonText3 === '取消选择' ? '#ffcccc' : '#2678ff',
                }"
              >
                {{ buttonText3 }}
              </a-button>
            </div>
          </el-card>

          <el-card class="box-card">
            <div class="radio-container">
              <el-radio v-model="checked1" label="1">可选择</el-radio>
            </div>
            <div
              class="group-info"
              style="
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                margin-top: 20px;
              "
            >
              <div class="position">第四位</div>
              <a-button
                type="primary"
                @click="toggleButtonState(4)"
                :style="{
                 marginLeft: '62px',
                  marginTop: '30px',
                  padding: '6px 6px',
                  color: buttonText4 === '取消选择' ? 'red' : 'white',
                  backgroundColor: buttonText4 === '取消选择' ? '#ffcccc' : '#2678ff',
                }"
              >
                {{ buttonText4 }}
              </a-button>
            </div>
          </el-card>
        </div>

        <!-- 第二排 -->
        <div class="card-row">
          <el-card class="box-card">
            <div class="radio-container">
              <el-radio v-model="checked1" label="1">可选择</el-radio>
            </div>
            <div
              class="group-info"
              style="
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                margin-top: 20px;
              "
            >
              <div class="position">第五位</div>
              <a-button
                type="primary"
                @click="toggleButtonState(5)"
                :style="{
                  marginLeft: '62px',
                  marginTop: '30px',
                  padding: '6px 6px',
                  color: buttonText5 === '取消选择' ? 'red' : 'white',
                  backgroundColor: buttonText5 === '取消选择' ? '#ffcccc' : '#2678ff',
                }"
              >
                {{ buttonText5 }}
              </a-button>
            </div>
          </el-card>

          <el-card class="box-card">
            <div class="radio-container">
              <el-radio v-model="checked1" label="1">可选择</el-radio>
            </div>
            <div
              class="group-info"
              style="
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                margin-top: 20px;
              "
            >
              <div class="position">第六位</div>
              <a-button
                type="primary"
                @click="toggleButtonState(6)"
                :style="{
                 marginLeft: '62px',
                  marginTop: '30px',
                  padding: '6px 6px',
                  color: buttonText6 === '取消选择' ? 'red' : 'white',
                  backgroundColor: buttonText6 === '取消选择' ? '#ffcccc' : '#2678ff',
                }"
              >
                {{ buttonText6 }}
              </a-button>
            </div>
          </el-card>
          <el-card class="box-card">
            <div class="radio-container">
              <el-radio v-model="checked1" label="1">可选择</el-radio>
            </div>
            <div
              class="group-info"
              style="
                display: flex;
                flex-direction: column;
                justify-content: flex-start;
                align-items: flex-start;
                margin-top: 20px;
              "
            >
              <div class="position">第七位</div>
              <a-button
                type="primary"
                @click="toggleButtonState(7)"
                :style="{
                 marginLeft: '62px',
                  marginTop: '30px',
                  padding: '6px 6px',
                  color: buttonText7 === '取消选择' ? 'red' : 'white',
                  backgroundColor: buttonText7 === '取消选择' ? '#ffcccc' : '#2678ff',
                }"
              >
                {{ buttonText7 }}
              </a-button>
            </div>
          </el-card>
        </div>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    setup() {
      const checked1 = ref('1') // 默认选中项
      const buttonText1 = ref('确定选择')
      const buttonText2 = ref('确定选择')
      const buttonText3 = ref('确定选择')
      const buttonText4 = ref('确定选择')
      const buttonText5 = ref('确定选择')
      const buttonText6 = ref('确定选择')
      const buttonText7 = ref('确定选择')

      // 切换按钮文本状态
      const toggleButtonState = (groupId: number) => {
        switch (groupId) {
          case 1:
            buttonText1.value = buttonText1.value === '确定选择' ? '取消选择' : '确定选择'
            break
          case 2:
            buttonText2.value = buttonText2.value === '确定选择' ? '取消选择' : '确定选择'
            break
          case 3:
            buttonText3.value = buttonText3.value === '确定选择' ? '取消选择' : '确定选择'
            break
          case 4:
            buttonText4.value = buttonText4.value === '确定选择' ? '取消选择' : '确定选择'
            break
          case 5:
            buttonText5.value = buttonText5.value === '确定选择' ? '取消选择' : '确定选择'
            break
          case 6:
            buttonText6.value = buttonText6.value === '确定选择' ? '取消选择' : '确定选择'
            break
          case 7:
            buttonText7.value = buttonText7.value === '确定选择' ? '取消选择' : '确定选择'
            break
        }
      }

      return {
        checked1,
        buttonText1,
        buttonText2,
        buttonText3,
        buttonText4,
        buttonText5,
        buttonText6,
        buttonText7,
        toggleButtonState,
      }
    },
  })
</script>

<style scoped>
  .card-row {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .box-card {
    background-color: #f4f3f3;
    width: 250px;
    margin-bottom: 20px;
  }

  .radio-container {
    margin-bottom: 10px;
  }

  .group-info {
    margin-top: 15px;
    padding-left: 68px;
    color: #808080;
  }

  .group-number,
  .group-name,
  .group-leader {
    margin: 5px 0;
  }
</style>

