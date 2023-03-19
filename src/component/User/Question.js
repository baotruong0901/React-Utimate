import _ from "lodash"
const Question = (props) => {
    const { data, index } = props
    if (_.isEmpty(data)) {
        return (
            <></>
        )
    }

    const handleChangeCheckBox = (e, aId, qId) => {

        props.handleCheckBox(aId, qId)

        // console.log(e.target.checked);
        // console.log('check data: ', data, aId, qId);
    }
    console.log('data', data);
    return (
        <>
            <div className="image">
                {data && data.image &&
                    <img src={`data:image/jpeg;base64,${data.image}`} />
                }
            </div>
            <div className="question">Question {index + 1}: {data.questionDescription}?</div>
            <div className="answer">
                {data && data.answers && data.answers.map((item, index) => {
                    return (
                        <div key={`anwser-${index}`} className="answer-item">
                            <div className="form-check">
                                <input className="form-check-input"
                                    type="checkbox"
                                    checked={item.isSelected}
                                    onChange={(e) => handleChangeCheckBox(e, item.id, data.questionId)}
                                />
                                <label className="form-check-label"
                                >
                                    {item.description}
                                </label>
                            </div>
                        </div>
                    )
                })}

            </div>
        </>
    )
}

export default Question