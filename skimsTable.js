/**
 * Created by Katrina on 5/29/15.
 */

var SkimsRow = React.createClass({
    render: function() {
        return (
            <tr className="skimsRow">
                <td>{this.props.skim.id}</td>
                <td>{this.props.skim.pos_entry_time}</td>
                <td>{this.props.skim.created_timestamp}</td>
                <td>{this.props.skim.eID}</td>
                <td>{this.props.skim.eID_name}</td>
                <td>{this.props.skim.manager_name}</td>
                <td>{this.props.skim.counted_cash}</td>
                <td>{this.props.skim.deposit_code}</td>
                <td>{this.props.skim.source}</td>
                <td>{this.props.skim.status}</td>
            </tr>
            );
    }
});
function getFormattedDate(date) {
    var year = date.getFullYear();
    var month = (1 + date.getMonth()).toString();
    month = month.length > 1 ? month : '0' + month;
    var day = date.getDate().toString();
    day = day.length > 1 ? day : '0' + day;
    var newFormat = year + '-' + month + '-' + day;
    console.log("date>>>>"+newFormat);
    return year + '-' + month + '-' + day;
}
var skimDate = getFormattedDate(new Date());

var SkimTable = React.createClass({
    render: function(){
        var rows = [];
        this.props.data.forEach(function(skim){
            rows.push(<SkimsRow
                skim = {skim}
                key = {skim.id} />);
        }.bind(this));
        return(
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Register</th>
                        <th>Skim Timestamp</th>
                        <th>Created Timestamp</th>
                        <th>Preparer ID</th>
                        <th>Preparer Name</th>
                        <th>Manager</th>
                        <th>Skim Amount</th>
                        <th>Deposit Code</th>
                        <th>Skim Type</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>{rows}</tbody>
            </table>
        );
    }
});

        var SkimList = React.createClass({
            render: function() {
            var skimNodes = this.props.data.map(function (skim) {
            return (

                <Skims>
                    <tr>
                        <td>
                                  {skim.id}
                        </td>
                        <td>
                                  {skim.pos_entry_time}
                        </td>
                        <td>
                                  {skim.created_timestamp}
                        </td>
                        <td>
                                  {skim.eID}
                        </td>
                        <td>
                                  {skim.eID_name}
                        </td>
                        <td>
                                  {skim.manager_name}
                        </td>
                        <td>
                                  {skim.counted_cash}
                        </td>
                        <td>
                                  {skim.deposit_code}
                        </td>
                        <td>
                                  {skim.source}
                        </td>
                        <td>
                                  {skim.status}
                        </td>
                    </tr>
                </Skims>
        );
    });
return (
    <div className="skimList">
                {skimNodes}
    </div>
    );
}
});

var DatePickerTest = React.createClass({
    handleDatePickerChange: function (eventArgs){
        console.log("handleDatePickerChange-onChangeTextBox:" + eventArgs.target.value );
    },
    componentDidMount: function () {
        var textBoxId = "TextBox";
        var minDate = new Date(1970, 10 - 1, 25);
        var maxDate = new Date();
        $("#" + textBoxId).datepicker({
            onSelect: function(date){
                console.log("onSelectDatePicker date:"+date);
                skimDate = date;
                var url = "http://development.mcdebos.com:80/api/cash/762/skims?store_busn_dt="+skimDate;
                $.ajax({
                    url: url,
                    type:'GET',
                    dataType: 'json',
                    success: function(data) {
                        {data: data};
                        console.log("successfully showing22");
                    }.bind(this),
                    error: function(xhr, status, err) {
                        console.error(this.props.url, status, err.toString());
                    }.bind(this)
                });
            },
            showOn: 'button',
            buttonText: 'Show Date',
            buttonImageOnly: true,
            dateFormat: "yy-mm-dd",
            buttonImage: 'http://i1375.photobucket.com/albums/ag446/eowyn_g/Work/icon_calendar_zpse819d8d4.gif',
            minDate: minDate,
            maxDate: maxDate
        });
        $(".ui-datepicker-trigger").each(function (index){
            $(this).insertBefore( $(this).prev('input') );
        });
        $("#" + textBoxId).datepicker('setDate',  new Date());
    },
    getInitialState: function() {
        return {data: []};
    },
    render: function() {
        console.log("render datepicker");
        return (
            <div >
                <input type='text' id="TextBox" onChange={this.handleDatePickerChange}/>
            </div>
            );
    }
});

var SkimBox = React.createClass({
    loadCommentsFromServer: function(){
        var url = this.props.url + skimDate;
        $.ajax({
            url: url,
            type:'GET',
            dataType: 'json',
            success: function(data) {
                this.setState({data: data});
                console.log("successfully showing");
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    getInitialState: function() {
        return {data: []};
    },
    componentDidMount: function() {
        this.loadCommentsFromServer();
        setInterval(this.loadCommentsFromServer, this.props.pollInterval);
    },
    render: function() {
        return (
            <div className="skimBox">
                <h3>Skim Business Date</h3>
                <DatePickerTest id="TextBox" data={this.state.data} />
                <SkimTable data={this.state.data} />
            </div>
            );
    }
});

React.render(
    <SkimBox url="http://development.mcdebos.com:80/api/cash/762/skims?store_busn_dt=" pollInterval={1000} />,
    document.getElementById('content')
);