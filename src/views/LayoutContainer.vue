<template>
  <!-- 内容区 -->
  <div>
    <router-view></router-view>
    <div class="container" v-if="showContainer">
      <div class="left">
        <!-- 左边新闻 -->
        <div v-for="news in Layout_news" :key="news.id" class="news-item">
          <router-link :to="'/news/' + news.url">
            <div class="news-text">
              <!-- 新闻的标题 -->
              <div class="news-text-title">
                {{ news.title }}
              </div>
              <!-- 新闻的来源及时间评论 -->
              <div class="news-text-other">
                <span>{{ news.type }}</span>
                <span>{{ news.time }}</span>
                <span>{{ news.comment }}评论</span>
              </div>
            </div>
            <div class="news-image">
              <!-- 图片 -->
              <img :src="news.image" alt="" />
            </div>
          </router-link>
        </div>
      </div>
      <div class="right">
        <!-- 右边的热搜榜 -->
        <ranklist></ranklist>
        <div ref="el" :style="{
          display: buttonDisplay,
        }" class="goTop" @click="goTopHandle">
          <i class="iconfont icon-jiantoushang"></i>
          回顶部
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useWindowScroll } from "@vueuse/core"
const { y: scrollY } = useWindowScroll()
const buttonDisplay = ref("none") // 控制按钮显示的状态
// 监视滚动条
watch(scrollY, () => {
  if (scrollY.value > 760) {
    // 显示回顶部按钮
    buttonDisplay.value = "block"
  } else {
    // 否则隐藏按钮
    buttonDisplay.value = "none"
  }
})
const el = ref(null)
import { useRoute } from "vue-router"
const route = useRoute()
// import { userLayoutNewsService } from "@/api/news"
import ranklist from "@/views/components/rankList.vue"
// 存储首页加载的新闻
const Layout_news = ref([])
let showContainer = ref(true)
watch(
  () => route.path,
  (newPath) => {
    // 当路径是 http://localhost:5173/ 时，设置 showContainer.value 为 true 否则就是false
    showContainer.value = newPath === "/"
  }
)
// 滑动加载
let isLoading = ref(false)
const loadMoreNews = async () => {
  if (isLoading.value) return
  isLoading.value = true
  const res = await userLayoutNewsService()
  Layout_news.value.push(...res.data)
  isLoading.value = false
}

const checkScroll = () => {
  if (!showContainer.value) return
  const scrollableHeight =
    document.documentElement.scrollHeight - window.innerHeight
  const scrolled = window.scrollY
  if (scrolled >= scrollableHeight - 10) {
    // 10是距离底部的偏移量，可以根据需要调整
    loadMoreNews()
  }
}

const handleScroll = () => {
  window.addEventListener("scroll", checkScroll)
}
onMounted(async () => {
  if (showContainer.value) {
    loadMoreNews()
    handleScroll()
  }
})

// 点击回到顶部
const goTopHandle = () => {
  // 点击按钮，使得页面返回顶部
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
  // 通过设置一个小延迟来等待滚动完成，再更新按钮的显示状态
  setTimeout(() => {
    buttonDisplay.value = "none"
  }, 300)
}

onUnmounted(() => {
  window.removeEventListener("scroll", checkScroll)
})
</script>

<style scoped>
.container {
  display: flex;
  /* 使用Flexbox布局 */
  justify-content: space-between;
  /* 在项目之间添加空间 */
  padding: 5rem 20px;
}

.left {
  flex: 0 0 60%;
  /* border: 1px solid #000; */
  /* 左侧部分占据75%的宽度 */
  /* 为了保证内容靠左显示，可以添加对齐样式 */
  text-align: left;
}

.right {
  flex: 0 0 20%;
  margin: 10px;
  padding: 10px;
  /* 右侧部分占据20%的宽度 */
}

.news-item {
  display: flex;
  /* 您可以在这里为每个新闻项添加额外的样式 */
  margin-bottom: 10px;
  justify-content: space-between;
  border: 1px solid #000;
  /* 添加一些底部间距 */
}

.news-item a {
  width: 100%;
  text-decoration: none;
  /* 移除下划线 */
  /* 继承父元素的字体颜色 */
  display: block;
  /* 使a标签占据整个.news-item */
  display: flex;
  /* 使a标签也成为flex容器 */
  justify-content: space-between;
  /* 保持内部元素之间的间隔 */
  text-decoration: none;
  color: inherit;
}

.news-text {
  width: 100%;
  flex: 1;
  padding-right: 10px;
}

.news-text-title {
  display: inline-block;
  font-size: 20px;
  font-weight: 500;
  line-height: 28px;
  word-break: break-all;
  align-items: center;
  color: #222;
  cursor: pointer;
  margin-bottom: 10px;
}

/* 新闻的时间与来源 */
.news-text-other {
  display: flex;
  justify-content: space-between;
  padding: 0 10px;
  font-size: 14px;
  line-height: 20px;
  padding-top: 30px;
  color: #999;
}

.news-image img {
  width: 100px;
  /* 图片宽度自适应容器 */
  height: 100px;
  /* 高度自动，保持图片比例 */
}

.goTop {
  position: fixed;
  left: 1426px;
  top: 686px;
  cursor: pointer;
  border-radius: 3px;
  box-shadow: 2px 2px 2px rgba(153, 153, 153, 0.18);
  color: rgb(43, 43, 43);
}
</style>
