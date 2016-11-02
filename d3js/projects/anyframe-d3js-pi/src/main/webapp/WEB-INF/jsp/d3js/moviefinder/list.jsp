<%@ page language="java" errorPage="/sample/common/error.jsp" pageEncoding="UTF-8" contentType="text/html;charset=utf-8" %>
<%@ include file="/sample/common/top.jsp"%>
<div class="location"><a href="<c:url value='/anyframe.jsp'/>">Home</a> &gt; <a href="<c:url value='/d3jsMovieFinder.do?method=list'/>">D3js 1.0.0</a></div>
</div>
<hr />

<div id="test">
    <p><a href="../">Home</a></p>
    <h1>Movie List : Timeline for MovieList by the released date </h1>
    <p>Data Reference from <a href="http://en.wikipedia.org">Wikipedia</a> </p>
</div>

<div id="graphArea" style="width:1000px; height:640px; border:dashed #555555 1px; display:inline-block;float:left;">
<div id="filterArea" class="hidden" style="width:1000px; height:640px; background-color:rgba(255,255,255, 0.8); z-index:50;position:absolute;"></div>
</div>

<div id="tooltip" class="hidden">
    <p><span class="tooltip-title">Detail Information</span></p>
    <p><span class="label">Genre : </span><span id="genre"></span></p>
    <p><span class="label">Title : </span><span id="title"></span></p>
    <p><span class="label">Director : </span><span id="director"></span></p>
    <p><span class="label">Actors : </span><span id="actor"></span></p>
    <p><span class="label">Ticket Price : </span>$<span id="ticketPrice"></span></p>
    <p><span class="label">Released Date : </span><span id="releasedDate"></span></p>
</div>

<script type="text/javascript" src="<c:url value='/sample/javascript/CommonScript.js'/>"></script>
<script type="text/javascript" src="<c:url value='/d3js/lib/d3.js'/>"></script>
<style type="text/css">
    .axis path,
    .axis line {
        fill: #444444;
        stroke: #444444;
        shape-rendering: crispEdges;
    }

    .movie-rect {
        fill : #1D9CFF;
        overflow : visible;
    }
    .movie-rect:hover {
        cursor: pointer;
    }

    #text-title {
        fill : #000000;
        text-decoration: underline;
        cursor : pointer;
    }


    #tooltip {
        position: absolute;
        min-width: 160px;
        width: auto;
        height: auto;
        padding: 10px;
        background-color: rgba(29, 156, 255, 0.95);
        font-family: "Lucida Sans Unicode";
        line-height: 20px;
        color : rgba(255, 255, 255, 0.8);
        webkit-box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
        -moz-box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
        box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.2);
        pointer-events: none;
        z-index : 1000;
    }

    .tooltip-title {
        font-size: 14px;
        line-height: 20px;
        text-decoration : underline;

    }

    #tooltip.hidden {
        display: none;
    }

    #filterArea.hidden {
        display:none;
    }

    #tooltip p {
        margin: 1px;
        font-family: "Lucida Sans Unicode";
        font-size: 12px;
        line-height: 20px;
        color : rgba(255, 255, 255, 0.8);
    }
</style>
<script type="text/javascript">

    var movies = [],
            movieList = [],
            genres = [],
            genreList = [];
   // var cnt =0;
    <c:forEach var="movie" items="${movies}">
    movies.push("${movie.genre.name}");
    movies.push("${movie.title}");
    movies.push("${movie.director}");
    movies.push("${movie.actors}");
    movies.push("${movie.ticketPrice}");
    movies.push("${movie.releaseDate}");
    movieList.push(movies);
    movies = [];//값을 초기화
    </c:forEach>

    <c:forEach var="genre" items="${genreList}">
    genres.push("${genre.genreId}");
    genres.push("${genre.name}");
    genres.push("${genre.movies}");
    genreList.push(genres);
    genres = [];//값초기화
    </c:forEach>

    //console.log("movieList", movieList);
   /* d3.json("genreList", function(json) {
        console.log("---------------");
        console.log(json);  //Log output to console
    });*/

    //=======================================================

    var startPt = 1990; //start point on timeline
    var finishPt = 2020; //end point on timeline
    var AREA_WIDTH = 1000, //WIDTH CONSTANT
            AREA_HEIGHT = 620; //HEIGHT CONSTANT

    var margin = {top: 20, right: 20, bottom: 50, left: 20},//setting margin
            width = AREA_WIDTH - margin.left - margin.right,//setting width with margin
            height = AREA_HEIGHT - margin.top - margin.bottom;//setting height with margin

    var formatNumber = d3.format(" 1f");

    //x 좌표 영역 설정
    var x = d3.scale.linear()
            .domain([startPt, finishPt])
            .range([0, width]);

    //y 좌표 영역 설정
    var y = d3.scale.linear()
            .domain([0, 30])
            .range([0, height]);

    //x 좌표 선 그리기
    var xAxis = d3.svg.axis()
            .scale(x)
            .ticks(10)
            .tickFormat(formatNumber)
            .orient("bottom");

    //create svg
    var svg = d3.select("#graphArea").append("p").append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    var BAR_HEIGHT = 10,
            BAR_WIDTH = 10;

    var X_POS = 0,
            Y_POS = 0,
            cnt = 0

    function categorizeMovieByGenre (val, cssProperty)  {

        switch (val) {
            case "Action":// GR-01  : 데이터 다시 BINDING 처리 필요함. TEXT 값 > 코드 값으로 매핑해야..
                return cssProperty + " : rgb(156, 29, 255);";
            case "Adventure"://
                return cssProperty + " : rgb(5, 216, 56);";
            case "Animation":
                return cssProperty + " : rgb(223, 233, 115);";
            case "Comedy":
                return cssProperty + " : rgb(255, 29, 74);";
            case "Crime":
                return cssProperty + " : rgb(56, 29, 255);";
            case "Drama":
                return cssProperty + " : rgb(255, 156, 29);";
            case  "Fantasy":
                return cssProperty + " : rgb(29, 185, 160);";
            case  "Romance":
                return cssProperty + " : rgb(29, 156, 255);";
            case "Sci-Fi" :
                return cssProperty + " : rgb(255, 29, 165);";
            case "Thriller" :
                return cssProperty + " : rgb(100, 100, 100);";
            case "ETC" :
                return cssProperty + " : rgb(29, 156, 255);";
        }//end of switch statement
    }

    //draw rectangle object with interactive events
    svg.append("g").selectAll("movieList")
            .data(movieList)
            .enter().append("rect")
            .attr("id", "movie-rect")
            .attr("class", function(d) { return d[0].toString(); })
            .attr("x", function(d) { var date = new Date(d[5]); X_POS = x(date.getFullYear() + date.getMonth()/12 + date.getDay()/(30*10)); d.push(X_POS);  return X_POS; })
            .attr("y", function(d) { cnt+=20; Y_POS = height -(BAR_HEIGHT +cnt);  d.push(Y_POS); return Y_POS; }  )
            .attr("width",  function(d) { return BAR_WIDTH; } )
            .attr("height", BAR_HEIGHT)
            .attr("style", function(d) {
                return categorizeMovieByGenre(d[0], "fill");
            })
            .on("mouseover", function(d) {
                //Get this bar's x/y values, then augment for the tooltip
                var xPosition = d[6]+50;
                var yPosition = d[7]-60;

                // movieList = [[genreName, title, director, actors, tickerPrice, releasedDate]]
                //Update the tooltip position and value

                d3.select("#tooltip").attr("style", categorizeMovieByGenre(d[0], "background-color"));

                d3.select("#tooltip")
                        .style("left", xPosition + "px")
                        .style("top", yPosition + "px")
                        .select("#genre").text(d[0])
                d3.select("#tooltip").select("#title").text(d[1])
                d3.select("#tooltip").select("#director").text(d[2])
                d3.select("#tooltip").select("#actor").text(d[3])
                d3.select("#tooltip").select("#ticketPrice").text(d[4])
                d3.select("#tooltip").select("#releasedDate").text(d[5].toString().split(" ", 1));

                //Show the tooltip
                d3.select("#tooltip").classed("hidden", false);
            })
            .on("mouseout", function() {

                //Hide the tooltip
                d3.select("#tooltip").classed("hidden", true);

            })
            .on("click", function(d) {
                console.log("this", this);
                //Show the tooltip
                //d3.select("#filterArea").classed("hidden", false);
                var $targetRect = d3.selectAll("." + d[0].toString()),
                        $targetText = d3.selectAll("." + d[0].toString() + "-text");

                if($targetRect.attr("width") == 15)
                {
                    $targetRect
                            .attr("width", 10)
                            .attr("height", 10)
                            .attr("clicked", false);
                    $targetText
                            .style({
                                "font-size" : "100%",
                                "font-weight" : "normal",
                                "z-index" : "1000"
                            });

                }else {

                    $targetRect
                            .attr("width", 15)
                            .attr("height", 15)
                            .attr("clicked", true);

                    $targetText
                            .style({
                                "font-size" : "120%",
                                "font-weight" : "bold",
                                "z-index" : "1000"
                            });
                }

            });

    cnt=0;

    //draw text area(movie title on the timeline) - info. : Movie Title, year
    svg.append("g").selectAll("movieList")
            .data(movieList)
            .enter()
            .append("text")
            .attr("id", "text-title")
            .attr("class", function(d) { return d[0].toString() + "-text"; })
            .attr("x", function(d) { return x(new Date(d[5]).getFullYear() + new Date(d[5]).getMonth()/12) + 20;})
            .attr("y", function(d) { cnt+=20; return height -(BAR_HEIGHT +cnt-10); }  )
            .text(function(d) { return d[1] + ", " + new Date(d[5]).getFullYear();})
            .on("click", function(d) {
                window.open("http://en.wikipedia.org/wiki/" + d[1].replace(" ", "_" ) );
            })
            .on("mouseover", function(d) {
                //Get this bar's x/y values, then augment for the tooltip
                var xPosition = d[6]+50;
                var yPosition = d[7]-60;

                // movieList = [[genreName, title, director, actors, tickerPrice, releasedDate]]
                //Update the tooltip position and value

                d3.select("#tooltip").attr("style", categorizeMovieByGenre(d[0], "background-color"));

                d3.select("#tooltip")
                        .style("left", xPosition + "px")
                        .style("top", yPosition + "px")
                        .select("#genre").text(d[0])
                d3.select("#tooltip").select("#title").text(d[1])
                d3.select("#tooltip").select("#director").text(d[2])
                d3.select("#tooltip").select("#actor").text(d[3])
                d3.select("#tooltip").select("#ticketPrice").text(d[4])
                d3.select("#tooltip").select("#releasedDate").text(d[5].toString().split(" ", 1));

                //Show the tooltip
                d3.select("#tooltip").classed("hidden", false);
            })
            .on("mouseout", function() {

                //Hide the tooltip
                d3.select("#tooltip").classed("hidden", true);

            });

    cnt=0;

    //draw rectangle object label for genre
    /*svg.append("g").selectAll("genreList")
            .data(genreList)
            .enter().append("rect")
            .attr("class", "movie-rect")
            .attr("x", function(d) { cnt+=20; return xAxis.x + cnt; })
            .attr("y", function(d) { return height + 30; }  )
            .attr("width",  function(d) { return BAR_WIDTH; } )
            .attr("height", BAR_HEIGHT)
            .attr("style", function(d) {
                return categorizeMovieByGenre(d, "fill");
            })*/


</script>

<hr />
<%@ include file="/sample/common/bottom.jsp"%>