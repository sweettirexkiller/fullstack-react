import _ from 'lodash';
import React from 'react';
import {connect} from 'react-redux';
import formFields from './formFields';

const SurveyReview = ({onCancel, formValues}) => {
    const reviewFields = _.map(formFields, ({label, name})=>{
        return (
            <div key={name}>
                <label>{label}</label>
                <div>{formValues[name]}</div>
            </div>
        )
    });


    return (
        <div>
            <h5>Please confirm your entries</h5>
            <div>
                {reviewFields}
            </div>

            <button
                className="yellow barken-3 btn-flat"
                onClick={onCancel}
            >
                Back
            </button>
        </div>
    );
};
function mapStateToProps(state){
    return {formValues: state.form.surveyForm.values};
}
export default connect(mapStateToProps)(SurveyReview);