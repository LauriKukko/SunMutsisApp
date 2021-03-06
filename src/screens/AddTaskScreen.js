import React, { Component } from 'react';
import { View, StyleSheet, Button, TextInput } from 'react-native';
import t from 'tcomb-form-native';
import SelectLocation from '../components/SelectLocation';
import DatePicker from 'react-native-datepicker';

const Form = t.form.Form;

const Task = t.struct({
    aihe: t.String,
    kuvaus: t.String,
    deadline: t.String,

});

const options = {
    fields: {
        aihe: {
            error: 'Ei ole sopiva nimi'
        },
        kuvaus: {
            error: 'Ei ole sopiva sisältö'
        },
        deadline: {
            error: 'Ei ole sopiva deadline'
        },
        sijainti: {
            error: 'Ei ole sopiva sijainti'
        },
    },
    stylesheet: formStyles,
};

export default class AddTaskScreen extends Component {

    constructor(props) {
        super(props);
        const task = this.props.navigation.getParam('task', '');


        this.state = {task: {
            aihe: task,
            kuvaus:"",
          //  deadline:"",
         //   sijainti:""
        }, isAddButtonVisible: true,
            isEditButtonVisible: false,
            isSaveButtonVisible: false
        }
    }

    componentDidMount() {
        if (!this.props.navigation.getParam('showSaveAndAddPlaceButton', true)) {
            this.setState({isAddButtonVisible: false, isEditButtonVisible: true})
        }
    }

    render() {
        const {navigate} = this.props.navigation;
        const taskId = this.props.navigation.getParam('taskId');
        const insertTask =  this.props.navigation.getParam('insertTask');
        const updateTask = this.props.navigation.getParam('updateTask');
        console.log(taskId);
        return(
            <View style={styles.container}>
                <Form
                    ref={c => this._form = c}
                    type={Task}
                    options={options}
                    onChange={(text) => this.setState({task:text})}
                    value={this.state.task}
                />
                <DatePicker
                    style={{
                        width: 370,
                        color: '#46529c',
                    }}
                    date={this.state.date}
                    mode="date"
                    placeholder="Valitse tehtävän deadline"
                    format="YYYY-MM-DD"
                    minDate="2019-01-01"
                    maxDate="2021-01-01"
                    confirmBtnText="Vahvista"
                    cancelBtnText="Peruuta"
                    customStyles={{
                        dateIcon: {
                            position: 'absolute',
                            left: 0,
                            top: 4,
                            marginLeft: 0
                        },
                        dateInput: {
                            marginLeft: 36
                        }
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                />
                <SelectLocation/>
                <View style={styles.viewStyles}>
                    {(this.state.isEditButtonVisible) &&<Button
                    title="Muokkaa"
                    onPress={() => this.setState({isSaveButtonVisible: true, isEditButtonVisible: false}) }
                    />}
                    {(this.state.isAddButtonVisible) && <Button
                        title="Lisää sijainti"
                        onPress={()=> navigate('MapviewWork')}  //onPressilla ohjautuu nyt vaan mapviewworkiin, täytyy päivittää sijainnin valinnaksi ( sanna )
                      //  onPress={() => console.log(this.state)}
                    />}
                    {(this.state.isAddButtonVisible) && <Button
                        title="Lisää tehtävä"
                        onPress={() => insertTask(this.state.task).then(
                            () => navigate('Home'))}
                    />}
                    {(this.state.isSaveButtonVisible) && <Button
                        title="Tallenna tehtävä"
                        onPress={() => updateTask({ _id: taskId },this.state.task).then(
                        () => navigate('Home'))}/>}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        marginTop: 50,
        padding: 20,
        backgroundColor: '#ffffff',
    },
    viewStyles: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

// Lomakkeen muotoilu (Samu)
const formStyles = {
    ...Form.stylesheet,
    formGroup: {
        normal: {
            marginBottom: 10
        },
    },
    controlLabel: {
        normal: {
            color: 'blue',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        },
        // Virheen sattuessa muotoilu
        error: {
            color: 'red',
            fontSize: 18,
            marginBottom: 7,
            fontWeight: '600'
        }
    }
};