/**
 * This file provided by Facebook is for non-commercial testing and evaluation
 * purposes only. Facebook reserves all rights not expressly granted.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * FACEBOOK BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
var _json =  
[
  {
      "id": 1388534400000,
      "author": "Pete Hunt",
      "text": "Hey there!"
  }
]
var comments = _json

var Comment = React.createClass({displayName: "Comment",
  rawMarkup: function() {
    var md = new Remarkable();
    var rawMarkup = md.render(this.props.children.toString());
    console.log(this.props.children)
    console.log(rawMarkup)
    return { __html: rawMarkup };
  },
  setStyle:function(){
    return {color:this.props.color}
  },

  render: function() {
    return (
      React.createElement("div", {className: "comment"}, 
        React.createElement("h2", {className: "commentAuthor"}, 
          this.props.author
        ), 
        React.createElement(Signature, null, this.props.signature), 
        React.createElement("span", {dangerouslySetInnerHTML: this.rawMarkup(), style: this.setStyle()})
      )
    );
  }
});
var Signature = React.createClass({displayName: "Signature",
  render:function(){
    return React.createElement("a", null, this.props.children)
  }
})
var CommentBox = React.createClass({displayName: "CommentBox",
  loadCommentsFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      type:'POST',
      cache: false,
      data:JSON.stringify(_json),
      success: function(data) {
        _json = data
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        this.setState({data:_json})
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  handleCommentSubmit: function(comment) {
    comments = this.state.data;
    // Optimistically set an id on the new comment. It will be replaced by an
    // id generated by the server. In a production application you would likely
    // not use Date.now() for this and would have a more robust system in place.
    comment.id = Date.now();
    comments.push(comment)
    this.setState({data: comments});
    // _json.push(comment)
    this.loadCommentsFromServer()
    
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
      React.createElement("div", {className: "commentBox"}, 
        React.createElement("h1", null, "Comments"), 
        React.createElement(CommentList, {data: this.state.data}), 
        React.createElement(CommentForm, {onCommentSubmit: this.handleCommentSubmit})
      )
    );
  }
});

var CommentList = React.createClass({displayName: "CommentList",
  render: function() {
    var commentNodes = this.props.data.map(function(comment) {
      return (
        React.createElement(Comment, {author: comment.author, key: comment.id, signature: comment.id}, 
          comment.text
        )
      );
    });
    console.log('----------------------------render')
    console.log(commentNodes)
    return (
      React.createElement("div", {className: "commentList"}, 
        commentNodes
      )
    );
  },
  componentWillMount:function(){
    console.log('----------------------------------will')
  },
  componentDidMount:function(){
    console.log('-----------------------------------did')
  },
});

var CommentForm = React.createClass({displayName: "CommentForm",
  getInitialState: function() {
    return {author: '', text: ''};
  },
  handleAuthorChange: function(e) {
    this.setState({author: e.target.value});
  },
  handleTextChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var author = this.state.author.trim();
    var text = this.state.text.trim();
    if (!text || !author) {
      return;
    }
    this.props.onCommentSubmit({author: author, text: text});
    this.setState({author: '', text: ''});
  },
  render: function() {
    return (
      React.createElement("form", {className: "commentForm", onSubmit: this.handleSubmit}, 
        React.createElement("input", {
          type: "text", 
          placeholder: "Your name", 
          ref: "name", 
          value: this.state.author, 
          onChange: this.handleAuthorChange}
        ), 
        React.createElement("input", {
          type: "text", 
          placeholder: "Say something...", 
          value: this.state.text, 
          onChange: this.handleTextChange}
        ), 
        React.createElement("input", {type: "submit", value: "Post"})
      )
    );
  }
});

ReactDOM.render(
  React.createElement(CommentBox, {url: "/json", pollInterval: 5000}),
  document.getElementById('content')
);