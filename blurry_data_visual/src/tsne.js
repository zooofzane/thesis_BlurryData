/* ------------------------- t-SNE helper functions ------------------------- */
function eucDist(event1, event2) {
    let delta1 = event2.longitude - event1.longitude;  
    let delta2 = event2.latitude - event1.latitude;
    let delta3 = event2.side_a_dset_id - event1.side_a_dset_id;
    let delta4 = event2.year - event1.year;
    let delta5 = event2.deaths_a - event1.deaths_a;
    let delta6 = event2.deaths_b - event1.deaths_b;
    let delta7 = event2.deaths_civilians - event1.deaths_civilians;
    let delta8 = event2.deaths_unknown - event1.deaths_unknown;
    let delta9 = event2.dyad_dset_id - event1.dyad_dset_id;
    let delta10 = event2.country_id - event1.country_id;
    let delta11 = event2.conflict_dset_id - event1.conflict_dset_id;
    let delta12 = event2.type_of_violence - event1.type_of_violence;
    return Math.sqrt(delta1 * delta1 + delta2 * delta2 + delta3 * delta3 + delta4 * delta4 + delta5 * delta5 + delta6 * delta6 + delta7 * delta7 + delta8 * delta8 + delta9 * delta9 + delta10 * delta10 + delta11 * delta11 + delta12 * delta12);    
}

function mat_ind(){
}

function squared(thisnumber){
    let thisresult = thisnumber * thisnumber;
    return thisresult;
}

function mat_ind(a,b){
    let ab = a + data.length * b;
    return ab;
}


/* -------------------------------------------------------------------------- */
/*                                    t-SNE                                   */
/* -------------------------------------------------------------------------- */
// let perplexity = 33;

// function pairwise_distances(){
//     // initialize some variables we use inside our loops
//     let x_i, x_j, distance;
//     let num_points = data.length;
//     // make_array is another helper function that just generates a new empty array of a given size.
//     const pw_dists = new Array(squared(num_points));
//     for(let i = 0; i < num_points; i++){
//         x_i = data[i];
//     // deal with the point itself here.
//     pw_dists[mat_ind(i,i)] = {source: i, target: i, distance:0};
//     for(let j = i + 1; j < num_points; j++){
//         x_j = data[j];
//         distance = eucDist(x_i, x_j);
//         pw_dists[mat_ind(i,j)] = {source: j, target: i, distance};
//         pw_dists[mat_ind(j,i)] = {source: i, target: j, distance};
//     }
//     }
//     return pw_dists;
// }



// function calc_entropy(probs){
//     return probs.reduce( 
//     (sum, p) => sum - (p>1e-7 ? p*log(p): 0), // super small probabilities can be ignored
//     0
//     )
// }

// // let target_entropy = log(perplexity);

// function gaussian_prob(distance, variance){
//     return exp(-squared(distance) / (2*variance))
// }

// function calc_gaussian_probs(distances, variance){
//     let sum_probs = 0;
//     // calc un-normalized probs and accumulate sum of probs for normalization
//     return distances.map( (dist, i) => {
//       const curr_prob = dist !== 0 ? gaussian_prob(dist, variance): 0;
//       sum_probs += curr_prob; // accumulate the sums  	
//       return curr_prob;       // send probability to our array 
//     }).map(p => p/sum_probs)  // return the prob vector after normalizing it using sum.
//   }