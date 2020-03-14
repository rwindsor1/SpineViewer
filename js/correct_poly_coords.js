function correct_poly_coords(jsonData){
    var mean_pos_x = 0;
    var num_coords = 0;
    var mean_pos_y = 0;
    var mean_slice_no = 0;

    
    for(i = 0; i < jsonData.length; i++){
        var numberPolygons = jsonData[i]['polys'].length;
        for(j = 0; j < numberPolygons; j++){
            poly = jsonData[i]['polys'][j];
            var sliceNumber = jsonData[i]['slice_nos'][j];
            for(k = 0; k < poly.length; k++){
                mean_pos_x += poly[k][0];
                mean_pos_y += poly[k][1];
                mean_slice_no += sliceNumber;
                num_coords += 1;

            };
        };
    };

    mean_pos_x = mean_pos_x/num_coords;
    mean_pos_y = mean_pos_y/num_coords;
    mean_slice_no = mean_slice_no/num_coords;

    for(i = 0; i < jsonData.length; i++){
        var numberPolygons = jsonData[i]['polys'].length;
        for(j = 0; j < numberPolygons; j++){
            poly = jsonData[i]['polys'][j];
            jsonData[i]['slice_nos'][j] = 2.55*(jsonData[i]['slice_nos'][j] - mean_slice_no);
            for(k = 0; k < poly.length; k++){
                jsonData[i]['polys'][j][k][0] = jsonData[i]['polys'][j][k][0] - mean_pos_x;
                jsonData[i]['polys'][j][k][1] = -(jsonData[i]['polys'][j][k][1] - mean_pos_y);
            };
        };
    };
}