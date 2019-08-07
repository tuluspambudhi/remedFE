import React from 'react'
import Axios from 'axios'
class Home extends React.Component{
    state = {
        data: [],
        selectedEdit : null
    }
    componentDidMount(){
        Axios.get('http://localhost:2000/users')
        .then((res) => {
            this.setState({data : res.data})
        })
        .catch((err) => {
            console.log(err)
        })
    }

    filterPekerjaan = () => {
        var jsx = this.state.data.map((p) => {
            return(
                <option value={p.id}>{p.pekerjaan}</option>
            )
        })
        return jsx
    }

    onBtnEdit = (a) => {
        this.setState({selectedEdit : a})
    }

    onBtnDelete = (id,index) => {
        var konfirm = window.confirm('Are You Sure Want To Delete this Data?')
        if(konfirm === true){
            Axios.delete('http://localhost:2000/users/' + id)
            .then((res) => {
                alert('Delete Data Success')
                var data = this.state.data
                data.splice(index , 1)
                this.setState({data : data})
            })
            .catch((err) => {

            })
        }
    }

    onBtnSave = () => {
        var nama = this.refs.nama.value
        var usia = this.refs.usia.value
        var pekerjaan = this.refs.pekerjaan.value

        var data = {
            nama : nama,
            usia : usia,
            pekerjaan : pekerjaan
        }

        if(nama !== '' && usia !== 0 && pekerjaan !== ''){
            Axios.post('http://localhost:2000/users' , data )
            .then((res) => {
                alert('Add Data Success')
                var users = this.state.data
                users.push(res.data)
                this.setState({data : users}) 
            })
            .catch((err) => {
                console.log(err)
            })
        }else{
            alert('Semua Form Harus Diisi')
        }
    }

    printDataTodo = () => {
        var functionMap = (val,index) => {
            if(this.state.selectedEdit == index){
                return(
                <tr key={index}>
                    <td>{index +1}</td>
                    <td><input type='text' ref='nama' className='form-control' defaultValue={val.usia}/></td>
                    <td><input type='text' ref='usia' className='form-control' defaultValue={val.usia}/></td>
                    <td><input type='text' ref='pekerjaan' className='form-control' defaultValue={val.pekerjaan} /></td>
                    <td> <input type='button' className='btn btn-success' onClick={() =>  this.onBtnSave(index)} value='Save' /> </td>
                    <td> <input type='button' className='btn btn-info' onClick={() => this.setState({selectedEdit : null})} value='Cancel' /> </td>                        
                </tr>
                )
            }
            return (
                <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{val.nama}</td>
                    <td>{val.usia}</td>
                    <td>{val.pekerjaan}</td>
                    <td><input type='button' className='btn btn-primary' onClick={() => this.onBtnEdit(index)} value='Edit' /> </td>
                    <td><input type='button' className='btn btn-danger' onClick={() => this.onBtnDelete(val.id , index)} value='Delete' /> </td>
                </tr>
            )
        }
        var jsx = this.state.data.map(functionMap)
        return jsx

    }

    render(){
        return(
            <div>
                <h1>SOAL 1</h1>
                <div className='row'>
                    <div className='col-md-4 mb-4'>
                        <select className='form-control'>
                            <option>Filter Pekerjaan</option>
                            {this.filterPekerjaan()}
                        </select>
                    </div>
                </div>
                <table className='table mb-4'>
                    <thead>
                        <tr>
                            <td>No</td>
                            <td>Nama</td>
                            <td>Umur</td>
                            <td>Pekerjaan</td>
                            <td>Act</td>
                        </tr>
                    </thead>
                    <tbody>
                        {this.printDataTodo()}
                    </tbody>
                </table>
                <div className='row'>
                    <div className='col-md-3'> <input type='text' className='form-control' placeholder='Nama' ref='nama'/> </div>
                    <div className='col-md-3'> <input type='text' className='form-control' placeholder='Usia' ref='usia'/> </div>
                    <div className='col-md-3'> <input type='text' className='form-control' placeholder='Pekerjaan' ref='pekerjaan' /> </div>
                    <div className='col-md-3'> <input type='button' className='form-control btn-info' value='add Data' onClick={this.onBtnSave} /> </div>
                </div>
            </div>
        )
    }
}

export default Home