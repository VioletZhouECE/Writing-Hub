import React from "react";

class LanguageSelect extends React.Component {
    constructor(props) {
      super(props);
    } 

    render() {
      return (
        <form>
          <label>
            <select value={this.props.value} onChange={this.props.handleChange}>
              <option value="English">English</option>
              <option value="Simplified Chinese">Similified Chinese</option>
              <option value="French">French</option>
              <option value="Japanese">Japanese</option>
            </select>
          </label>
        </form>
      );
    }
  }

  export default LanguageSelect;