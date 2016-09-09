import './index.less'
import React from 'react'
import classnames from 'classnames'
import Markdown from 'public/Markdown'

const Doc = props => {
  return (
    <div className="doc">
      <h2>{props.name.charCodeAt(0) < 97 ? '<' + props.name + ' />' : props.name}</h2>
      {props.props && props.props.length ? (
        <table>
          <thead>
            <tr>
              <th>属性</th>
              <th>类型</th>
              <th>说明</th>
            </tr>
          </thead>
          <tbody>
            {props.props.map(prop => (
              <tr key={prop.name}>
                <td className={classnames('doc__prop-name', {
                  'doc__prop-name--required': prop.required
                })}>
                  {prop.name}
                </td>
                <td className="doc__prop-type">{prop.types.join(' | ')}</td>
                <td>
                  <Markdown html={prop.desc} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
      {props.apis && props.apis.map(api => {
        const { name, type, desc, params } = api
        return (
          <dl key={name}>
            <dt>
              {name}{type ? null : '( ' + (params || []).map(v => v.name).join(', ') + ' )'}
            </dt>
            {params && (
              <dd>
                <h2>参数</h2>
                <ul>
                  {params.map(param => (
                    <li key={param.name}>
                      {param.name} {param.type}
                      <Markdown html={param.desc} />
                    </li>
                  ))}
                </ul>
              </dd>
            )}
            {api['return'] && (
              <dd>
                <h2>返回</h2>
                {api['return'].type + ' ' + api['return'].desc}
              </dd>
            )}
            {type && (
              <dd>
                <h2>类型</h2>
                {type}
              </dd>
            )}
            <dd>
              <h2>描述</h2>
              <Markdown html={desc} />
            </dd>
          </dl>
        )
      })}
    </div>
  ) 
}

export default Doc