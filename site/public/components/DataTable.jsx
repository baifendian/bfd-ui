import React from 'react'
import { render } from 'react-dom'
import DataTable from 'c/dataTable/datatable.jsx'
import Paging from 'c/paging/paging.jsx'


var items = {totalList:[
    { name: '张三', age: 27, height:'175cm',weight:'66kg' ,country:'中国'},
    { name: '王伟', age: 15 ,height:'185cm',weight:'69kg',country:'日本'},
    { name: '李明伟', age:34,height:'160cm',weight:'88kg',country:'香港'},
    { name: '赵四', age: 27, height:'166cm',weight:'66kg' ,country:'台湾'},
    { name: '王五', age: 15 ,height:'190cm',weight:'69kg',country:'安徽'},
    { name: '徐锦江', age:34,height:'168cm',weight:'88kg',country:'河南'},
    { name: '张楠', age: 27, height:'165cm',weight:'66kg' ,country:'福建'},
    { name: '王小可', age: 15 ,height:'177cm',weight:'69kg',country:'广东'},
    { name: '李建国', age:34,height:'161cm',weight:'88kg',country:'四川'}
],
    totalNum:500,
    currentPage:1
};
var columns = {key:{name:'姓名',age:'年龄',height:'身高',weight:'体重',country:'国家/地区'}}


export default () => {
    render(<DataTable items={items} columns={columns} />, document.getElementById('demo'))
    render(<Paging rowsPage="10" totalNum={items.totalNum} currentPage={items.currentPage} />,document.getElementById('paging'))
}