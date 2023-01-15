terraform {
  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 4.0"
    }
    vercel = {
      source  = "vercel/vercel"
      version = "~> 0.3"
    }
  }
  backend "s3" {
    bucket  = "blntrsz-terraform-up-and-running-state"
    key     = "global/s3/terraform.tfstate"
    region  = "eu-central-1"
    encrypt = true
  }
}

module "budget" {
  source = "./modules/budget"
  email  = "orosz.balint.97@gmail.com"
}

data "aws_route53_zone" "blntrsz" {
  name = "blntrsz.com"
}

resource "aws_route53_record" "default" {
  zone_id = data.aws_route53_zone.blntrsz.zone_id
  name    = "blntrsz.com"
  type    = "A"
  ttl     = 300
  records = ["76.76.21.123"]
}

module "www" {
  source     = "./modules/subdomain"
  zone_id    = data.aws_route53_zone.blntrsz.zone_id
  sub_domain = "www"
}

module "json-formatter" {
  source     = "./modules/subdomain"
  zone_id    = data.aws_route53_zone.blntrsz.zone_id
  sub_domain = "json"
}

module "movieligent" {
  source     = "./modules/subdomain"
  zone_id    = data.aws_route53_zone.blntrsz.zone_id
  sub_domain = "movieligent"
}

module "text-compare" {
  source     = "./modules/subdomain"
  zone_id    = data.aws_route53_zone.blntrsz.zone_id
  sub_domain = "c"
}

module "url-shortener" {
  source     = "./modules/subdomain"
  zone_id    = data.aws_route53_zone.blntrsz.zone_id
  sub_domain = "link"
}

module "recipes" {
  source     = "./modules/subdomain"
  zone_id    = data.aws_route53_zone.blntrsz.zone_id
  sub_domain = "r"
}

