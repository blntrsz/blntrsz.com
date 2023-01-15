terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
  }
}

resource "aws_route53_record" "cname" {
  zone_id = var.zone_id
  name    = var.sub_domain
  type    = "CNAME"
  ttl     = 300
  records = [var.vercel_cname]
}

