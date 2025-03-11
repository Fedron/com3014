pub use sea_orm_migration::prelude::*;

mod m20250226_103552_create_user;
mod m20250311_130030_add_user_roles;

pub struct Migrator;

#[async_trait::async_trait]
impl MigratorTrait for Migrator {
    fn migrations() -> Vec<Box<dyn MigrationTrait>> {
        vec![
            Box::new(m20250226_103552_create_user::Migration),
            Box::new(m20250311_130030_add_user_roles::Migration),
        ]
    }
}
