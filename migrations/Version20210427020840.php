<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210427020840 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE hero_hero_ability (hero_id INT NOT NULL, hero_ability_id INT NOT NULL, INDEX IDX_1F75E06E45B0BCD (hero_id), INDEX IDX_1F75E06E5AAEC857 (hero_ability_id), PRIMARY KEY(hero_id, hero_ability_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE hero_hero_ability ADD CONSTRAINT FK_1F75E06E45B0BCD FOREIGN KEY (hero_id) REFERENCES hero (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE hero_hero_ability ADD CONSTRAINT FK_1F75E06E5AAEC857 FOREIGN KEY (hero_ability_id) REFERENCES hero_ability (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE hero_hero_ability');
    }
}
