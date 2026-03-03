using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace user_api.Models
{
    [Table("users")]
    public class User
    {
        [Key]
        [Column("id")]
        public Guid Id { get; set; }

        [Required]
        [Column("email")]
        public required string Email { get; set; }
        [Required]
        [Column("password")]
        public required string Password { get; set; }
        [Required]
        [Column("first_name")]
        public required string FirstName { get; set; }
        [Required]
        [Column("last_name")]
        public required string LastName { get; set; }
    }
}
