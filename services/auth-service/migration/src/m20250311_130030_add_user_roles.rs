use sea_orm_migration::{
    prelude::{extension::postgres::Type, *},
    schema::{pk_auto, uuid},
};

#[derive(DeriveMigrationName)]
pub struct Migration;

#[async_trait::async_trait]
impl MigrationTrait for Migration {
    async fn up(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .create_type(
                Type::create()
                    .as_enum(UserRole::Enum)
                    .values([
                        UserRole::CommunityEditor,
                        UserRole::CommunityViewer,
                        UserRole::EventsEditor,
                        UserRole::EventsViewer,
                    ])
                    .to_owned(),
            )
            .await?;

        // let mut foreign_key = ForeignKey::create()
        //     .name("FK_user_role")
        //     .from(User::Table, User::Id)
        //     .to(
        //         UserCommunityRoleMapping::Table,
        //         UserCommunityRoleMapping::UserId,
        //     )
        //     .on_delete(ForeignKeyAction::Cascade)
        //     .on_update(ForeignKeyAction::Cascade)
        //     .to_owned();

        manager
            .create_table(
                Table::create()
                    .table(UserCommunityRoleMapping::Table)
                    .if_not_exists()
                    .col(pk_auto(UserCommunityRoleMapping::Id).unique_key())
                    .col(uuid(UserCommunityRoleMapping::UserId))
                    .col(uuid(UserCommunityRoleMapping::CommunityId))
                    .col(
                        ColumnDef::new(UserCommunityRoleMapping::Role)
                            .custom(UserRole::Enum)
                            .not_null(),
                    )
                    .foreign_key(
                        ForeignKey::create()
                            .name("FK_user_role")
                            .from(
                                UserCommunityRoleMapping::Table,
                                UserCommunityRoleMapping::UserId,
                            )
                            .to(User::Table, User::Id),
                    )
                    .to_owned(),
            )
            .await
    }

    async fn down(&self, manager: &SchemaManager) -> Result<(), DbErr> {
        manager
            .drop_foreign_key(
                ForeignKey::drop()
                    .name("FK_user_role")
                    .table(UserCommunityRoleMapping::Table)
                    .to_owned(),
            )
            .await?;

        manager
            .drop_table(
                Table::drop()
                    .table(UserCommunityRoleMapping::Table)
                    .to_owned(),
            )
            .await?;

        manager
            .drop_type(Type::drop().name(UserRole::Enum).to_owned())
            .await
    }
}

#[derive(DeriveIden)]
enum User {
    Table,
    Id,
}

#[derive(DeriveIden)]
pub enum UserRole {
    #[sea_orm(iden = "user_role")]
    Enum,
    EventsViewer,
    EventsEditor,
    CommunityViewer,
    CommunityEditor,
}

#[derive(DeriveIden)]
enum UserCommunityRoleMapping {
    Table,
    Id,
    UserId,
    CommunityId,
    Role,
}
