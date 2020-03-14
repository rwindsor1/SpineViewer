function draw_polys(jsonData){
    vertebrateGeometries = []
    for(i = 0; i < jsonData.length; i++){
        var numberPolygons = jsonData[i]['polys'].length;
        var vertebrateGeometry = new THREE.Geometry();
        // loop through each polygon for vertebrate
        for(j = 0; j < numberPolygons; j++){
            poly = jsonData[i]['polys'][j]
            sliceNumber = jsonData[i]['slice_nos'][j]

            // add in edges for first face
            for(k = 0; k < poly.length; k++){
                vertebrateGeometry.vertices.push(
                    new THREE.Vector3(poly[k][0], poly[k][1], sliceNumber)
                );
            }
            if (j == 0){
                vertebrateGeometry.faces.push(
                    new THREE.Face3(0, 1, 2),
                    new THREE.Face3(2, 0, 3),
                )
            } else { 
                var totalNumberVertices = vertebrateGeometry.vertices.length - 1

                vertebrateGeometry.faces.push(
                    new THREE.Face3(totalNumberVertices - 3, totalNumberVertices - 7, totalNumberVertices - 2),
                    new THREE.Face3(totalNumberVertices - 2, totalNumberVertices - 6, totalNumberVertices - 3),
                    new THREE.Face3(totalNumberVertices - 1, totalNumberVertices - 5, totalNumberVertices - 2),
                    new THREE.Face3(totalNumberVertices - 2, totalNumberVertices - 6, totalNumberVertices - 1),
                    new THREE.Face3(totalNumberVertices - 1, totalNumberVertices - 5, totalNumberVertices - 0),
                    new THREE.Face3(totalNumberVertices - 0, totalNumberVertices - 4, totalNumberVertices - 1),
                    new THREE.Face3(totalNumberVertices - 0, totalNumberVertices - 4, totalNumberVertices - 3),
                    new THREE.Face3(totalNumberVertices - 3, totalNumberVertices - 7, totalNumberVertices - 0),
                )


                // add on end shape if at far edge of vertebrae
                if (j == numberPolygons - 1){
                    vertebrateGeometry.faces.push(
                        new THREE.Face3(totalNumberVertices - 3, totalNumberVertices - 2, totalNumberVertices - 1),
                        new THREE.Face3(totalNumberVertices - 1, totalNumberVertices - 3,totalNumberVertices - 0),
                    )
                }
            }
        }
        vertebrateGeometries.push(vertebrateGeometry);
    }
    return vertebrateGeometries
};
