export default class Viz extends Component {
  componentDidMount() {
  	this.draw(this.props)
  }
  // componentDidUpdate(prevProps){
  //   //this makes sure we don't redraw unnecessarily --
  //   //only when we add a new shape
  //   if(this.props.shapes.length !== prevProps.shapes.length){
  //     d3.select('.viz > *').remove();
  //     this.draw(this.props)
  //   }
  // }

  render() {
    return (
      <div className="viz" />
    )
  }
  
  draw = (props) => {
    const w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    const h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    d3.select('.viz').append('svg')
      .attr('height', h)
      .attr('width', w)
      .attr('id', 'svg-viz')


  }

}
