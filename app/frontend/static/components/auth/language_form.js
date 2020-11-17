import React from "react";
import {displayErrorMessage} from "../../scripts/display_messages"

class LanguageForm extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            learnLanguage: "English",
            firstLanguage: "English"
        }

        this.handleSelectLearnLanguage = this.handleSelectLearnLanguage.bind(this);
        this.handleSelectFirstLanguage = this.handleSelectFirstLanguage.bind(this);
    }

    handleSelectLearnLanguage(e){
        this.setState({learnLanguage: e.target.value});
    }

    handleSelectFirstLanguage(e){
        this.setState({firstLanguage: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        e.stopPropagation();
        
        // Fetch form to apply custom Bootstrap validation
        var form = $('#form-validation');

        //validate if language is empty
        if (form[0].checkValidity() === false) {
            form.addClass('was-validated');
            return;
        }

        //validate if learnLanguage is the same as firstLanguage
        if (this.state.learnLanguage == this.state.firstLanguage){
            displayErrorMessage("languages cannot be the same");
            return;
        }

        this.props.handleSubmitForm(this.state);
    }

    render(){
        return(
            <div className='login-background'> 
                <div className='login-container login-container-border pt-4'>
                    <div className='center'>
                        <form id="form-validation" onSubmit={e=>this.handleSubmit(e)} noValidate>
                            <div class="form-group py-4">
                                <label for="learning_language_select">Tell us the languages you want to learn</label>
                                <small id = "learning_language_select_help" class = "form-text text-muted">Everyone is willing to help you learn!</small>
                                <select class="form-control" id="learning_language_select" value= {this.state.learnLanguage} onChange={this.handleSelectLearnLanguage} required>
                                    <option>English</option>
                                    <option>Simplified Chinese</option>
                                    <option>Traditional Chinese</option>
                                    <option>French</option>
                                    <option>Japanese</option>
                                </select>
                                <div class="invalid-feedback">
                                    You need to select a language to learn
                                </div>
                            </div>
                            <div class="form-group py-4">
                                <label for="teaching_language_select">Tell us the languages you are fluent in</label>
                                <small id = "teaching_language_select_help" class = "form-text text-muted">Help others learn by teaching them your languages!</small>
                                <select class="form-control" id="teaching_language_select" value= {this.state.firstLanguage} onChange={this.handleSelectFirstLanguage} required>
                                    <option>English</option>
                                    <option>Simplified Chinese</option>
                                    <option>Traditional Chinese</option>
                                    <option>French</option>
                                    <option>Japanese</option>
                                </select>
                                <div class="invalid-feedback">
                                    You need to select a language you can teach
                                </div>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button type="submit" className="btn btn-primary">Explore Writing Hub!</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>)
    }
}

export default LanguageForm;