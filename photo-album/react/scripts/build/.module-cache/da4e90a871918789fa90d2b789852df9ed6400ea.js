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


var imgArr = []
  for(var i=650;i--;){
    imgArr.push({
      url:"./images/"+(i%10)+".jpeg",
      title:"标题"
    })
  }


  var width = window.innerWidth
  var height = window.innerHeight
  var _width = 200 ;
  var _height = 180;

function numR(min,max){
  return ~~(Math.random() * (max-min) + min)
}



var Mainbody = React.createClass({displayName: "Mainbody",
  getInitialState:function() {
      return {
        center:0
      };
  },
  select:function(e){
    this.setState({center:e})
  },
  componentDidMount:function() {
      width = window.innerWidth
      height = window.innerHeight
      _width = document.querySelectorAll(".phone-unit")[1].clientWidth;
      _height = document.querySelectorAll(".phone-unit")[1].clientHeight;
      console.log(_width)
  },
  render:function(){
    // this.componentDidMount();
    var _that = this;
    var ImageList = imgArr.map(function(item,index){
      return  React.createElement(Photounit, {url: item.url, text: item.title, index: index, center: _that.state.center == index, onSelect: _that.select})
    })
    return(
        React.createElement("div", {className: "mainbody"}, 
          ImageList
        )
      )
  }
})

var Photounit = React.createClass({displayName: "Photounit",
  getInitialState:function(){
    return {
      flip:false,
    }
  },
  select:function(){
    if(this.props.center){
      this.setState({flip:!this.state.flip})
    }else{
      console.log('select')
      this.props.onSelect(this.props.index)
    }
  },
  render:function(){
    var attr = {}
    var styleSheet={}
    if(this.props.center){
      if(this.state.flip){
        attr.rotate = " rotateY(180deg)";
      }
      styleSheet.WebkitTransform = "translate("+ (width/2-_width) +"px,"+ (height/2-_height) +"px)" + (attr.rotate || "")
      styleSheet.zIndex = 1;
      styleSheet.width = _width*2 +'px'
      styleSheet.height = _height*2 +'px'

      // console.log(width,_width)
      // console.log((width/2-_width/2*1.5))
    }else{
      // styleSheet.WebkitTransition = numR(0,10)/10 + "s cubic-bezier("+ numR(0,10)/10 +","+ numR(-3,3) +", "+ numR(0,10)/10 +", "+ numR(-3,3) +")"
      styleSheet.WebkitTransform = "translate("+ (numR(-_width/2,width-_width/2)) +"px,"+ (numR(-_height/2,height-_height/2)) +"px) rotate("+ numR(-30,30) +"deg)"
    }


    
    // console.log(styleSheet)


    // console.log(this)
    return (
        React.createElement("div", {className: "phone-unit" + (this.props.center&&" select"||""), style: styleSheet, onClick: this.select}, 
            React.createElement("div", {className: "back-text"}, "反面文字"), 
            React.createElement("div", {className: "img-box", style: {"background-image":"url("+ this.props.url +")"}}), 
            React.createElement("div", {className: "img-title"}, this.props.text)
        )
      )
  }
})


ReactDOM.render(
    React.createElement(Mainbody, null),
    document.getElementById('content')
  )


