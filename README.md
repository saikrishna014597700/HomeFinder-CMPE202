## Team Project Link

https://github.com/gopinathsjsu/fa20-cmpe-202-sec-02-team-project-team_11

## Team 11 Members

* Kena Mehta - 014597648

* Puneet Jyot Singh Khurana - 014508208

* Sai Krishna Nandikonda - 014597700

* Shiva Pandey – 014638338

## Diagrams

### UI Wireframes

#### Dashboard

![](/UIWireframes/Seller%20Landing%20Page%20-%20Dashboard.png)


#### Add Property Page 

![](/UIWireframes/Kena-%20On%20Add%20new%20property%20Click%20-%20Seller-Realtor.png)


#### Admin Dashboard

![](/UIWireframes/Admin.png)


#### Buyer Landing Page

![](/UIWireframes/Buyer%20Landing%20Page%20-%20Dashboard.png)


**Find more wireframes in the UIWireframes folder**

### System Architecture

![](/UIWireframes/SystemArchitecture.jpg)


### Database Design

![](/UIWireframes/Database\_Schema.jpg)


### Burndown Chart

![](/images/BurnDownChart.png)

## Design Decisions

### MERN stack(Mongo DB, Express, ReactJS, NodeJS):

The speed of design and development of websites and web applications increased. Using MERN stack, the server cost reduces significantly.

The performance will be greatly optimized in the web application.

###  Decorator design pattern:

Wrapping a component in react and attaching some new functionalities or props to it look really similar to the decorator design pattern.

**Example** :

var enhanceComponent = (Component) =\&gt;

class Enhance extends React.Component {

render() {

return (

\&lt;Component

{...this.state}

{...this.props}

/\&gt;

)

}

};

export default enhanceComponent;

Very often we expose a factory function that accepts our original component and when called returns the enhanced/wrapped version of it. For example:

var OriginalComponent = () =\&gt; \&lt;p\&gt;Hello world.\&lt;/p\&gt;;

class App extends React.Component {

render() {

return React.createElement(enhanceComponent(OriginalComponent));

}

};

### MVC Design Pattern:

In the MVC design pattern, the view and the controller makes use of strategy design and the view and the model are synchronized using the observer design. Hence, we may say that MVC is a compound pattern. The controller and the view are loosely coupled and one controller can be used by multiple views. Implemented this MVC design pattern in the frontend and the backend.

### Strategy Design pattern:

myMethod(){

Switch(this.strategyselected)

{

Case SimpleStrategy: ComposeWithSimple()

Case TexStrategy: ComposeWithTex()

}

}

The above code show the classical problem in which you need selected a

concrete algorithm in your app.

However, it can be more flexible using the Strategy Pattern which will be

the following structure:

mymethod(){

this.strategySelected-\&gt; Compose();

}

Strategy pattern allows the user to select the algorithm dynamically. So it gives a great amount of flexibility to our application.

## Feature Set

| **Task** | **Contributor** |
| --- | --- |
| Register/Login | Shiva Pandey |
| Approve/ Remove users | Puneet Jyot Singh |
| Search | Sai krishna Nandikonda |
| Save as Favourites | Sai krishna Nandikonda |
| Sell | Kena Mehta |
| Buy | Puneet Jyot Singh |
| Rent out | Kena Mehta |
| Rent | Shiva Pandey |

## Directory Structure:

**![](/UIWireframes/Project\_Structure.png)**
