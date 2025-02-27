import Mock from "mockjs"

// 自定义规则，生成随机评论
Mock.Random.extend({
  randomComment: function () {
    const comments = [
      "这个观点非常有趣！",
      "我完全同意你的看法。",
      "这个问题我之前没考虑过，谢谢分享。",
      "有趣的想法，但我不完全同意。",
      "这篇文章写得真好。",
      "我觉得这可能不是这个问题的最佳解决方案。",
      "很棒的观点，我之前从没这么想过。",
      "这个评论区的讨论非常精彩！",
      "我有不同的看法，但我尊重你的观点。",
      "这确实是一个值得深思的问题。",
      "这真是一次美好的体验！",
      "令人惊叹的作品！",
      "我真的很享受这个时刻。",
      "感觉就像置身于仙境。",
      "这绝对是一场视觉盛宴。",
      "无法用言语来形容。",
      "这是一种独特的美妙。",
      "真是太令人兴奋了！",
      "我被深深地打动了。",
      "难以置信的表现。",
      "这个地方真是一个宝藏。",
      "值得一游的好地方。",
      "这是我一直在寻找的。",
      "让人心情愉悦。",
      "我很喜欢这个地方的氛围。",
      "我迫不及待再来一次。",
      "这是一次美食之旅。",
      "这里的食物味道非常美味。",
      "我真的很享受这顿饭。",
      "服务态度非常好。",
      "我感到非常满足。",
      "这是一次完美的放松。",
      "绝对是一次愉快的体验。",
      "这个地方真是与众不同。",
      "我爱上了这里。",
      "我对这里的一切都印象深刻。",
      "值得珍藏的回忆。",
      "我会一直怀念这个时刻。",
      "每个人都应该来这里一次。",
      "这里的风景太美了。",
      "我感到非常幸运能够来这里。",
      "这是一个梦想成真的地方。",
      "我被这里的独特之处深深吸引。",
      "这个地方注定会成为传奇。",
      "在这里度过的时光非常特别。",
      "这个经历永远留在了我心中。",
      "这是一次令人愉快的冒险。",
      "这个地方充满了惊喜。",
      "我无法忘怀这个瞬间。",
      "这个地方真的很特别。",
      "我感到自己变得更加富有。",
      "这是一次难以忘怀的体验。",
      "这里的一切都太美好了。",
      "我被这里的神奇之处所震撼。",
      "这是一次真正的奇妙之旅。",
      "我会永远怀念这个时刻。",
      "这个地方充满了美丽。",
      "我找到了心灵的宁静。",
      "这个经历改变了我的生活。",
      "我感到非常幸福能够体验到这一切。",
    ]
    return this.pick(comments)
  },
})

// 创建一个函数，每次调用时生成新的随机评论
const generateRandomComment = () => {
  return Mock.Random.randomComment()
}

export { generateRandomComment }
