// import React from 'react'
// import ReactDOM from 'react-dom'
// import TestUtils from 'react-addons-test-utils'
// import DateRange from '../DateRange'

// describe('DateRange', () => {

//   describe('basic', () => {

//     it('className is ok', () => {
//       const instance = TestUtils.renderIntoDocument(<DateRange className="test" />)
//       expect(ReactDOM.findDOMNode(instance).className.split(' ')).toContain('test')
//     })

//     it('style is ok', () => {
//       const instance = TestUtils.renderIntoDocument(<DateRange style={{color: 'red'}} />)
//       expect(ReactDOM.findDOMNode(instance).style.color).toContain('red')
//     })

//     it('onClick is ok', () => {
//       const handleClick = jest.fn()
//       const instance = TestUtils.renderIntoDocument(<DateRange onClick={handleClick} />)
//       TestUtils.Simulate.click(ReactDOM.findDOMNode(instance))
//       expect(handleClick).toBeCalled()
//     })
//   })

//   it('default date is ok', () => {
//     const instance = TestUtils.renderIntoDocument(<DateRange />)
//     expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[0].value).toBe(new Date().toLocaleDateString())
//   })

//   it('custom date is ok', () => {
//     const instance = TestUtils.renderIntoDocument(<DateRange date="2016-01-01" onSelect={jest.fn()} />)
//     expect(TestUtils.scryRenderedDOMComponentsWithTag(instance, 'input')[0].value).toBe(new Date('2016-01-01').toLocaleDateString())
//   })

//   it('onSelect is ok', () => {
//     const handleSelect = jest.fn()
//     const instance = TestUtils.renderIntoDocument(<DateRange date="2016-01-01" onSelect={handleSelect} />)
//     const buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button')
//     TestUtils.Simulate.click(buttons[6])
//     expect(handleSelect).toBeCalledWith(new Date(2016, 0, 2).setHours(0, 0, 0, 0))
//   })
// })