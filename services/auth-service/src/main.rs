fn main() {
    match api::start() {
        Ok(_) => println!("Finished running!"),
        Err(e) => eprintln!("Something went wrong! {e}"),
    };
}
