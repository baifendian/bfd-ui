/**
 * Created by BFD_270 on 2016-02-19.
 */
import './main.css'
import 'bfd-bootstrap'
import React, {PropTypes} from 'react'
import classNames from 'classnames'
export default React.createClass({
    handleClick: function() {

    },
    getInitialState:function(){
        return {
            token:0
        }
    },
    render:function(){
        let key = this.props.columns.key
        let columnkey = [];
        for(var k in key){
            columnkey.push(key[k])
        }

        let items = this.props.items.totalList;

        let token=0
        return(
            <table className="table">
                <thead>
                <tr>
                    {
                        columnkey.map(function(key){
                            return <th key={key}>{key}</th>
                            })
                    }
                </tr>
                </thead>
                <tbody>
                    {
                       items.map(function(item) {
                           var items = Object.keys(key)

                        return (<tr key={token++}>
                            {
                                items.map(function(s){
                                    return <td key={item[s]}>{item[s]}</td>
                                })
                            }
                           </tr>)
                           })
                    }
                </tbody>
            </table>


        )


    }
})
