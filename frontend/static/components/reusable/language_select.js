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
              <option value="Simplified Chinese">简体中文</option>
              <option value="Traditional Chinese">繁體中文</option>
              <option value="French">Français</option>
              <option value="Japanese">日本語</option>
            </select>
          </label>
        </form>
      );
    }
  }

  export default LanguageSelect;