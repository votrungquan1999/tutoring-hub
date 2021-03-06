import React, { Fragment } from "react";
import "./YesNoInput.css";

class YesNoInput extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedElementName: undefined
		};

		this.onChange = this.onChange.bind(this);
		this.onRightClick = this.onRightClick.bind(this);
	}

	onChange(e) {
		this.triggerChange(e.target.name);
	}

	onRightClick(e) {
		e.preventDefault();
		this.clear();
	}

	triggerChange(elementName) {
		if (elementName) {
			this.setState({
				selectedElementName: elementName
			});
			this.props.onChange(elementName);
		} else {
			this.setState({
				selectedElementName: undefined
			});
			this.props.onChange(undefined);
		}
	}

	clear() {
		this.triggerChange(undefined);
	}

	isChecked(name) {
		return this.state.selectedElementName === name;
	}

	render() {
		const inputs = this.props.choices.map(function(value, index) {
			return (
				<Fragment key={value + "-" + index}>
					<div className="YesNoInput-component--wrapper-container">
						<input
							type="radio"
							className={"option-input radio"}
							value={value}
							name={value}
							onChange={this.onChange}
							onContextMenu={this.onRightClick}
							checked={this.isChecked(value)}
						/>
						<label htmlFor={value}>{value}</label>
					</div>
				</Fragment>
			);
		}, this);

		return (
			<div className={"YesNoInput-component"}>
				<p>{this.props.parameter}</p>
				<div className={"YesNoInput-component--wrapper"}>{inputs}</div>
			</div>
		);
	}
}

export default YesNoInput;
