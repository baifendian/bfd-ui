# 日期选择 DatePicker

单选日期
@DatePickerBasic
```js
import DatePicker from 'bfd/DatePicker'

const DatePickerBasic = () => {
  return (
    <DatePicker onSelect={date => console.log(date)} />
  )
}
```

日期区间
@DateRangeBasic
```js
import { DateRange } from 'bfd/DatePicker'

const DateRangeBasic = () => {
  return (
    <DateRange onSelect={(start, end) => console.log(start, end)} />
  )
}
```

> 日期相关的属性支持 `string|number`，即日期字符串或时间戳（毫秒）

## \<DatePicker /> 属性

### date `string|number`
当前日期

### defaultDate `string|number`
同 `date`，不可控

### onSelect `function(newDate)`
选择日期后的回调

### min `string|number`
可选日期范围最小值

### max `string|number`
可选日期范围最大值


## \<DateRange /> 属性

### start `string|number`
开始日期

### defaultStart `string|number`
同 `start`，不可控

### end `string|number`
结束日期

### defaultEnd `string|number`
同 `end`，不可控

### onSelect `function(newStart, newEnd)`
选择日期后的回调

### min、max
同 `DatePicker`
