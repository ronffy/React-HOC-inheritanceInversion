import React from 'react';

// 添加displayName，方便后续定位和调试
const getDisplayName = (WarpedComponent) => WarpedComponent.displayName || WarpedComponent.name || 'Component';

/**
 * react反向继承的渲染劫持实例
 * @author ronffy
 */
const MyContainer = (WarpedComponent) => class extends WarpedComponent {
	static displayName = `HOC${getDisplayName(WarpedComponent)}`
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
