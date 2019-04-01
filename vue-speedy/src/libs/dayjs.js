import dayjs from 'dayjs'
import AdvancedFormat from 'dayjs/plugin/advancedFormat'
import RelativeTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn' // 按需加载

/* 配置 dayjs */
dayjs.locale('zh-cn') // 全局使用中文
dayjs.extend(AdvancedFormat)
dayjs.extend(RelativeTime)

export default dayjs