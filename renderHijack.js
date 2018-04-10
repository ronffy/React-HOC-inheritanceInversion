import React from 'react';

/**
 * react反向继承的渲染劫持实例
 * @author whr
 */
 
 /**
 * 应用案例：react-css-modules 
 * @see https://github.com/gajus/react-css-modules/blob/master/src/extendReactClass.js
 * 第16行 `const WrappedComponent = class extends Component {`
 * 第44行 `const renderResult = super.render();`
 */
const MyContainer = (WarpedComponent) => class extends WarpedComponent {
	render() {
		const tree = super.render();
		const oldStyle = tree.props.style || {};
		const newProps = {
			style: {
				...oldStyle,
				fontSize: '30px',
			}
		}
		const props = {
			...tree.props,
			...newProps,
		}
		const element = React.cloneElement(tree, props, tree.props.children)
		return element
	}
}

@MyContainer
class MyComponent extends React.Component {
	render() {
		return (
			<div style={{ background: 'blue' }}>
				我是组件内容
			</div>
		)
	}
}
